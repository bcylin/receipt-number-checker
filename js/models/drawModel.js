/**
 * models/drawModel.js
 * Module that defines winning numbers in the draw
 *
 * @return	{function} Model constructor extended from Bacbone.Model
 * @author  Ben on 18/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.Model.extend({

	hasValue: false,

	initialize: function() {
		var url = this.get('url');
		url && this.fetchData(url);
	},

	// Manually set prize and winning numbers
	setData: function(data) {
		var index = 0,
			_list = {},
			_mapping = {};

		// map the prize id, prize name, and winning numbers
		$.each(data.prizes, function(key, value) {
			_mapping[index + 'thPrize'] = key;
			_list[index + 'thPrize'] = value;
			index += 1;
		});

		this.clear({silent: true});
		this.set({
			months: data.months,
			list: _list,
			mapping: _mapping
		});

		this.sortDataByType();
		this.createNameMapping();
	},

	// Get raw HTML from the official website, extract winning numbers
	fetchData: function(url) {
		var self = this,
			dfd = this.fetching = new $.Deferred();

		var processData = function(content) {
			self.rawdata = content;
			self.extractDate(content);
			self.extractNumbers(content);
			self.sortDataByType();
			self.createNameMapping();
			dfd.resolve();
		};

		// get the cached files
		$.ajax({
			url: 'cache/' + url.match(/[A-Z\_\d]+\.htm[l]?/ig)[0],
			dataType: 'html',
			success: function(content) {
				processData(content);
			},
			error: function(content) {
				console.log('Fail fetching URL: ' + url);
				dfd.reject();
			}
		});

		return dfd.promise();
	},

	// Helper function: extract date from HTML raw data
	// @param {string} HTML rawdata
	extractDate: function(rawdata) {
		var caption = rawdata.match(/<div\ class\=\"caption\">.+月/ig),
			date = caption || [""],
			months = date[0].match(/[\d-\ ]+月/);
		if (months) {
			this.set('months', months[0]);
		}
	},

	// Helper function: extract numbers from HTML raw data
	// @param {string} HTML rawdata
	extractNumbers: function(rawdata) {

		var data = rawdata.replace(/<!DOCTYPE.+<\/head>|[\t\n]+|\ \ |<\/html>/g, ""),
			$info = $(data).last();

		var self = this,
			prizeNameOfID = {},
			winningNumbers = {};

		// extract each prize
		$info.find('.number').each(function(index, item) {
			var numbers = $(item).text() !== "" ? $(item).text().match(/(\d+)/ig) : [""];
			var name = $(item).closest('td').prev('th').text();

			// name of this prize id
			prizeNameOfID[index + 'thPrize'] = name === "頭獎" ? "頭獎至六獎" : name;

			// winning numbers of this prize id
			winningNumbers[index + 'thPrize'] = numbers;
		});

		this.set({
			list: winningNumbers,
			mapping: prizeNameOfID
		});
	},

	// Helper function: sort numbers into 2 categories
	sortDataByType: function() {
		var self = this,
			list = self.get('list'),
			prizeNameOfID = self.get('mapping');

		this.set({
			// numbers that need every digit matching
			matchAll:
				$.map(list, function(numbers, id) {
					if ( prizeNameOfID[id] === "特別獎" || prizeNameOfID[id] === "特獎" )
						return numbers;
				}),
			// numbers that need at least three ending digits matching
			matchThree:
				$.map(list, function(numbers, id) {
					if ( prizeNameOfID[id] !== "特別獎" && prizeNameOfID[id] !== "特獎" )
						return numbers;
				})
		});
	},

	// Helper function: create prize number-name mapping
	createNameMapping: function() {
		var numbers = $.map(this.get('list'), function(value, id) { return value; });
		var self = this,
			prizeNameOfID = this.get('mapping'),
			prizeNameOfNumber = {};

		$.each(this.get('list'), function(id, numbers) {
			$.each(numbers, function(i, number) {
				prizeNameOfNumber[number] = prizeNameOfID[id];
			});
		});
		this.set('prizeName', prizeNameOfNumber);
	}
});

});