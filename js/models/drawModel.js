/**
 * models/drawModel.js
 * Module that defines winning numbers in the draw
 *
 * @return	{function} Model constructor extended from Bacbone.Model
 * @author  Ben on 18/Jul/2012
 */

define([
	'jquery',
	'backbone'
], function($) {

return Backbone.Model.extend({

	// Manually set prize and winning numbers
	setData: function(data) {
		var index = 0,
			numberList = {},
			prizeNameOfID = {};

		// map the prize id, prize name, and winning numbers
		$.each(data.prizes, function(key, value) {
			prizeNameOfID[index + 'thPrize'] = key;
			numberList[index + 'thPrize'] = value;
			index += 1;
		});

		this.clear({silent: true});
		this.set({
			months: data.months.replace(/0(?=[1-9])/g, ""),
			numberList: numberList,
			prizeNameOfID: prizeNameOfID
		});

		this.sortDataByType();
		this.createNumberNameMapping();
	},

	// Helper function: sort numbers into 2 categories
	sortDataByType: function() {
		var self = this,
			numberList = self.get('numberList'),
			prizeNameOfID = self.get('prizeNameOfID');

		this.set({
			// numbers that need every digit matching
			matchAll:
				$.map(numberList, function(numbers, id) {
					if ( prizeNameOfID[id] === "特別獎" || prizeNameOfID[id] === "特獎" )
						return numbers;
				}),
			// numbers that need at least three ending digits matching
			matchThree:
				$.map(numberList, function(numbers, id) {
					if ( prizeNameOfID[id] !== "特別獎" && prizeNameOfID[id] !== "特獎" )
						return numbers;
				})
		});
	},

	// Helper function: create prize number-name mapping
	createNumberNameMapping: function() {
		var numbers = $.map(this.get('numberList'), function(value, id) { return value; });
		var self = this,
			prizeNameOfID = this.get('prizeNameOfID'),
			prizeNameOfNumber = {};

		$.each(this.get('numberList'), function(id, numbers) {
			$.each(numbers, function(i, number) {
				prizeNameOfNumber[number] = prizeNameOfID[id];
			});
		});
		this.set('prizeNameOfNumber', prizeNameOfNumber);
	}
});

});