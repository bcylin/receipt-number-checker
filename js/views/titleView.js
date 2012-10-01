/**
 * views/titleView.js
 * Display the title bar
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 01/Oct/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.resetTitle();
	},

	// Display winning message of a result
	// @param {object} a result returned by PrizeModel
	changeTitleForResult: function(result) {

		this.$el.removeClass('match-all match-three');
		var shouldMatchAll = (result.matchType === "matchAll");

		if (result.isMatched) {
			var winning = shouldMatchAll ? "" : "中獎！";
			this.$el.addClass(shouldMatchAll ? 'match-all' : 'match-three');
			this.$el.text(winning + result.months + result.prizeName);
		} else {
			this.$el.text(result.months + "未中獎");
		}
	},

	resetTitle: function() {
		this.$el.removeClass('match-all match-three');
		this.$el.text("統一發票對獎程式");
	}
});

});