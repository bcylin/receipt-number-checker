/**
 * views/welcomeView.js
 * Display welcome message
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 24/Jul/2012
 */

define([
	'jquery',
	'backbone',
	'bootstrap-modal',
	'bootstrap-transition'
], function() {

return Backbone.View.extend({

	initialize: function() {
		this.$el.modal();

		// Adjust position
		var height = this.$el.height();
		this.$el.css('margin-top', - height * 2 / 3);

		this.bindEvents();
	},

	bindEvents: function() {

		var self = this;
		$(document).on('keydown', function(event) {
			self.$el.modal('hide');
		});

		this.$el.on('hide', function() {
			$(document).off('keydown');
			$('input#inputNumber').focus();
		});
	}
});

});