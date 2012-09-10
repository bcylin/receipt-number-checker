/**
 * views/inputView.js
 * Take care of input behaviour
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 19/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	NUM_CHAR_TO_DETECT: 3,

	initialize: function() {
		this.app = window.receiptApp;
		this.delegate = this.options.delegate;
		this.dataSource = this.options.dataSource;
		this.$input = this.$el.find('#inputNumber');	// the text input
	},

	events: {
		'keyup #inputNumber': 'processInput'
	},

	processInput: function(event) {
		var input = event.target;

		// ignore non numeric input & non arrow key
		if ( !(event.keyCode >= 48 && event.keyCode <= 57) && !(event.keyCode >= 37 && event.keyCode <= 40) ) {
			var num = input.value.match(/\d+/);
			input.value = num ? num[0] : "";
		}

		// save the number input once it reaches certian digits
		if (input.value.length >= this.NUM_CHAR_TO_DETECT) {
			var num = input.value;
			input.value = "";	// empty input
			this.save(num);
		}
	},

	// Save the number to the collection
	// @parem {string} a number to save
	// @return {object} result that describes if the number is winning
	save: function(num) {
		var result = this.dataSource.match(num);

		// create a record model, insert into list collection
		var record = new Backbone.Model(result);
		this.collection.add(record);

		return result;
	},

	// Input a number
	// @param {number|string} of three digits
	input: function(num) {
		num.toString().length === this.NUM_CHAR_TO_DETECT && this.save(num);
	},

	focus: function() {
		this.$input.focus();
	},

	blur: function() {
		this.$input.blur();
	}
});

});