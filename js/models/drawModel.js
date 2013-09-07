/**
 * models/drawModel.js
 * Module that defines winning numbers in a draw
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
		var prizeNumbers = data.prizes;

		this.clear({silent: true});
		this.set({
			months: data.months.replace(/0(?=[1-9])/g, ""),
			prizeNumbers: prizeNumbers
		});

		this.sortDataByType();
		this.createNumberNameMapping();
	},

	// Helper function: sort numbers into 2 categories
	sortDataByType: function() {
		var self = this,
			prizeNumbers = this.get('prizeNumbers');

		this.set({
			// numbers that need every digit matching
			matchAll:
				$.map(prizeNumbers, function(numbers, name) {
					if (name === "特別獎" || name === "特獎")
						return numbers;
				}),
			// numbers that need at least three ending digits matching
			matchThree:
				$.map(prizeNumbers, function(numbers, name) {
					if (name !== "特別獎" && name !== "特獎")
						return numbers;
				})
		});
	},

	// Helper function: create prize number-name mapping
	createNumberNameMapping: function() {
		var self = this,
			prizeNameOfNumber = {};

		$.each(this.get('prizeNumbers'), function(name, numbers) {
			$.each(numbers, function(index, number) {
				prizeNameOfNumber[number] = name;
			});
		});

		this.set('prizeNameOfNumber', prizeNameOfNumber);
	}
});

});
