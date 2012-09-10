/**
 * views/counterView.js
 * Display winning and total counts
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 21/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.delegate = this.options.delegate;
		this.$total = this.$el.find('#total');
		this.$win = this.$el.find('#win');
	},

	events: {
		'click .frame': 'toggle'
	},

	update: function() {
		this.$total.text( this.collection.count('total') );
		this.$win.text( this.collection.count('win') );
	},

	toggle: function() {
		this.delegate.counterViewDidToggle();
	}
});

});