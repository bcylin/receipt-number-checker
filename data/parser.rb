#
# data/parser.rb
# https://github.com/bcylin/receipt-number-checker
#
# Created by Ben (c) 2012
# Released under the MIT License
# http://opensource.org/licenses/MIT
#

#!/usr/bin/env ruby

begin
    gem "nokogiri"
rescue Gem::LoadError
    system("gem install nokogiri")
    puts "nokogiri is now installed. Run the script again."
    exit
end

require "nokogiri"
require "open-uri"
require "json"

# Fetch data

url = "http://invoice.etax.nat.gov.tw/invoice.html"

begin
    html = Nokogiri::HTML(open(url))
    puts "Fetched from URL"
rescue
    path = "../cache/invoice.html"
    
    if not File.exists?(path)
        puts "Error loading HTML file"
        exit
    end
    
    file = File.expand_path(path)
    f = File.open(file)
    html = Nokogiri::HTML(f)
    f.close
    puts "Fetched from cache"
end


# Parse winning numbers in certain div with given id
# @param  {Nokogiri::HTML::Document} html
# @param  {String} div id
# @return {String} month name
# @return {Hash}   "prize name" => [numbers...]
def parse(html, id)
    nodes = html.xpath("//div[@id='#{id}']")
    month = nodes.xpath(".//h2")[0].content.match(/\d+-\d+.{1}/)[0]
    titles = nodes.xpath(".//span[@class='t18Red']/../../td[@class='title']")
    numbers = nodes.xpath(".//span[@class='t18Red']")
    draw = {}
    titles.each_with_index do |node, index|
        draw[node.content] = numbers[index].content.split(/[^\d]/)
    end
    return month, draw
end

this_month, this_draw = parse(html, "area1")
last_month, last_draw = parse(html, "area2")


# Output as JSON file

draws = {
    this_month => this_draw,
    last_month => last_draw
}

filename = File.expand_path("./numbers.json")
File.open(filename, "w") do |file|
    file.write( draws.to_json )
    puts "Data output: #{filename}"
end