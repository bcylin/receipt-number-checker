/**
 * views/notifyView.js
 * Display winning dialogue
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 22/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone',
	'order!bootstrap-modal',
	'order!bootstrap-transition'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.delegate = this.options.delegate;
		this.$el.modal({show: false});

		// find each element on the modal
		this.$mark = this.$el.find('.mark');
		this.$months = this.$el.find('.months');
		this.$result = this.$el.find('.result');
		this.$firstFive = this.$el.find('.first-five');		// first five digits
		this.$lastThree = this.$el.find('.last-three');		// last three digits
		this.$description = this.$el.find('.description');

		// adjust position
		var height = this.$el.height();
		this.$el.css('margin-top', - height * 2 / 3);

		this.bindEvents();
	},

	bindEvents: function() {
		// bind enter key to continue
		var self = this;
		$(document).on('keyup', function(event) {
			event.which == 13 && self.$el.modal('hide');
		});
		// focus on input after modal dismissed
		this.$el.on('hide', function() {
			self.delegate.notifyViewDidDismiss();
		});
	},

	// Display winning message of a record
	// @param {object} a given record (Backbone.Model)
	displayResult: function(record) {
		var result = record.toJSON();

		if (result.isMatched) {
			var moreThanThreeDigits = (result.matchedNumber.length > 3),
				shouldMatchAll = (result.matchType === "matchAll");

			this.delegate.notifyViewWillAppear();
			this.$mark
				.removeClass('check-mark question-mark')
				.addClass(shouldMatchAll ? 'question-mark' : 'check-mark');
			this.$months.text(result.months);
			this.$result.text(result.prizeName);
			this.$firstFive.text(moreThanThreeDigits ? result.matchedNumber.substr(0, 5) : "");
			this.$lastThree.text(result.num);
			this.$description.text(
				shouldMatchAll ? "需要8位數字與上列號碼相同" :
				moreThanThreeDigits ? "中獎了！請留意末三碼以外的相同數字" :
				"中獎了！"
			);

			this.$el.modal('show');
		}
	}
});

});