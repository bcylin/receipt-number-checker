/**
 * views/resultView.js
 * Display winning dialogue
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 24/Sep/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		// find each element on the modal
		this.$months = this.$el.find('.months');
		this.$result = this.$el.find('.result');
		this.$firstFive = this.$el.find('.first-five');		// first five digits
		this.$lastThree = this.$el.find('.last-three');		// last three digits
		this.$description = this.$el.find('.description');
	},

	// Display winning message of a result
	// @param {object} a result returned by PrizeModel
	displayResult: function(result) {

		this.$months.text(result.months);
		this.$lastThree.text(result.num);

		if (result.isMatched) {
			var moreThanThreeDigits = (result.matchedNumber.length > 3),
				shouldMatchAll = (result.matchType === "matchAll");

			this.$result.text(result.prizeName);
			this.$firstFive.text(moreThanThreeDigits ? result.matchedNumber.substr(0, 5) : "");
			this.$description.text(
				shouldMatchAll ? "需要8位數字與上列號碼相同" :
				moreThanThreeDigits ? "中獎了！請留意末三碼以外的相同數字" :
				"中獎了！"
			);
		} else {
			this.$firstFive.text("");
			this.$result.text("未中獎");
			this.$description.text("");
		}
	}
});

});