/**
 * views/switchView.js
 * Switch between current draw and previous draw
 *
 * @return	{object} View constructor extended from Bacbone.View
 * @author	Ben on 18/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.app = window.receiptApp;
		// Display months on switch buttons
		this.$el.find('#thisDraw').text( this.app.prize.getMonths('thisDraw') );
		this.$el.find('#prevDraw').text( this.app.prize.getMonths('prevDraw') );
	},

	events: {
		'change input.switch': 'switch'
	},

	switch: function(event) {

		// toggle buttons
		var $selected = $(event.target);
		$selected.parent().siblings().removeClass('selected');
		$selected.parent().addClass('selected');

		// tell otehr componants that the draw has changed
		var selectedDraw = event.target.value;
		this.app.prize.setDraw(selectedDraw);
		this.app.prizeView.refresh();
		this.app.inputView.focus();
	}
});

});