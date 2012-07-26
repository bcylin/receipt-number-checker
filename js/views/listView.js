/**
 * views/listView.js
 * Display a list of input record
 *
 * @return	{function} View constructor extended from Bacbone.View
 * @author	Ben on 19/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone',
	'order!scrollTo'
], function($) {

return Backbone.View.extend({

	initialize: function() {
		this.app = window.receiptApp;

		// template of an item on the list
		this.template = this.$el.find('.template').html().trim();
		this.compiled = _.template(this.template);

		this.$ul = this.$el.find('ul');
		this.$body = $('body');
		this.partiallyHidden = false;

		// toggle speed and whether to show slide down effect
		this.config = {
			speed: this.options.speed !== undefined ? this.options.speed : 'fast',
			effect: this.options.effect !== undefined ? this.options.effect : true
		};
	},

	events: {
		'click .winning': 'triggerNotify'
	},

	// Display the newly added record on the list
	showAdded: function() {
		var record = this.collection.last(),
			isMatched = record.get('isMatched'),
			matchType = record.get('matchType');

		// fill in arguments of compiled template
		var html = this.compiled({
				num: 	record.get('num'),
				months: record.get('months'),
				status: isMatched ? 'winning' : 'missed',
				mark: 	! isMatched ? 'cross-mark' :
						matchType === 'matchThree' ? 'check-mark' :
						'question-mark',
				result: ! isMatched ? "" :
						matchType === 'matchThree' ? "中獎" :
						record.get('prizeName') + "號碼"
			});

		var $li = $(html);
		this.$ul.prepend($li);

		// scroll to the top when a new item is added
		window.scrollY > 0 && this.$body.scrollTo( 0, { axis: 'y', duration: this.config.speed} );

		// slide down animation
		if ( this.config.effect ) {
			var height = $li.outerHeight();
			this.$el.animate({ top: '-=' + height + 'px' }, 0);
			this.$el.animate({ top: '+=' + height + 'px' }, 400);
		}
	},

	// show only winning numbers on the list
	displayWon: function() {
		this.$missedList = this.$ul.find('li.missed').slideUp(this.config.speed);
		this.partiallyHidden = true;
	},

	// show all input numbers on the list
	displayAll: function() {
		this.$missedList && this.$missedList.slideDown(this.config.speed);
		this.partiallyHidden = false;
	},

	displayToggle: function() {
		this.partiallyHidden ? this.displayAll() : this.displayWon();
	},

	triggerNotify: function(event) {
		var num = $(event.target).closest('li').find('.num').text();
		this.app.notifyView.displayWin(num);
	}
});

});