/**
 * views/mobileView.js
 * Display non-compatible message for mobile devices
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 25/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		// Clear everything on the page
		this.$el.empty().removeClass('desktop').addClass('mobile');

		var $msg = $('<div class="msg">').text('目前暫時不支援行動裝置').appendTo(this.$el);
		var $background = $('<div class="msg-background">').appendTo(this.$el);
	}
});

});