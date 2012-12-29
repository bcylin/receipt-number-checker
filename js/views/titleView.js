/**
 * views/titleView.js
 * Display the title bar
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 01/Oct/2012
 */

define([
	'jquery',
	'backbone'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.$title = this.$el.children('.title');
		this.resetTitle();
	},

	// Display winning message of a result
	// @param {object} a result returned by PrizeModel
	changeTitleForResult: function(result) {

		this.$title.text("");
		this.$el.children('.winning-msg').remove();
		this.$el.removeClass('match-all match-three');
		var shouldMatchAll = (result.matchType === "matchAll");

		if (result.isMatched) {
			var winning = shouldMatchAll ? "" : "中獎！";
			this.$el.addClass(shouldMatchAll ? 'match-all' : 'match-three');
			// Add a zoom down winning message
			var $span = $('<span>', {
				'class': 'winning-msg',
				'text': winning + result.months + result.prizeName
			});
			this.$el.append($span);
			// Use CSS3 transition
			setTimeout(function(){ $span.addClass('steady'); }, 0);
		} else {
			this.$title.text(result.months + "未中獎");
		}
	},

	resetTitle: function() {
		this.$el.removeClass('match-all match-three');
		this.$el.children('.winning-msg').remove();
		this.$title.text("統一發票對獎程式");
	}
});

});