begin
  gem "nokogiri"
rescue Gem::LoadError
  puts "nokogiri is required. Run `gem install nokogiri`."
  exit
end

require "nokogiri"
require "open-uri"
require "JSON"

task default: "parse"

desc "Echo parsed receipt numbers from http://invoice.etax.nat.gov.tw/"
task :parse do
  url = "http://invoice.etax.nat.gov.tw/"
  begin
    html = Nokogiri::HTML(open(url))
  rescue
    puts "Invalid HTML from #{url}"
    next
  end

  this_month, this_draw = parse(html, "area1")
  last_month, last_draw = parse(html, "area2")

  this_month = (this_month == "area1") ? "本期" : this_month
  last_month = (this_month == "area2") ? "前期" : last_month

  # Output as JSON file
  draws = {
    this_month => this_draw,
    last_month => last_draw
  }

  puts JSON.pretty_generate(draws)
end


private


# Parse winning numbers in certain div with given id
# @param  {Nokogiri::HTML::Document} html
# @param  {String} div id
# @return {String} month name
# @return {Hash}   "prize name" => [numbers...]
def parse(html, id)
  nodes = html.xpath("//div[@id='#{id}']")
  month = nodes.xpath(".//h2").map { |node|
              node.content.match(/\d{2}-\d{2}.{1}/)
          }.reject!(&:nil?).first.to_s
  month = month.empty? ? id : month
  titles = nodes.xpath(".//span[@class='t18Red']/../../td[@class='title']")
  numbers = nodes.xpath(".//span[@class='t18Red']")
  draw = {}
  titles.each_with_index do |node, index|
    prize_name = (node.content == "頭獎") ? "頭獎至六獎" : node.content
    draw[prize_name] = numbers[index].content.split(/[^\d]/)
  end
  return month, draw
end
