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
			speed: this.options.speed !== undefined ? this.options.speed : 'default',
			effect: this.options.effect !== undefined ? this.options.effect : true
		};
	},

	events: {
		'click .winning': 'triggerNotify'
	},

	// Display a record on the list
	show: function(record) {

		if (!record) { return; }
		var isMatched = record.get('isMatched'),
			matchType = record.get('matchType');

		// fill in arguments of compiled template
		var html = this.compiled({
				id:		record.cid,
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

		if ( !this.itemHeight ) {
			this.itemHeight = $li.outerHeight();
		}
	},

	// Display the newly added record on the list
	showJustAdded: function(newRecord) {
		this.show(newRecord);

		// scroll to the top when a new item is added
		window.scrollY > 0 && this.$body.scrollTo( 0, { axis: 'y', duration: this.config.speed} );

		// slide down animation
		if ( this.config.effect ) {
			this.$el.animate({ top: '-=' + this.itemHeight + 'px' }, 0);
			this.$el.animate({ top: '+=' + this.itemHeight + 'px' }, this.config.speed);
		}
	},

	// Display the entire list or part of it
	render: function(part) {
		this.clear();

		var all = !part;
		// get all records or just matched ones
		var records = this.collection.select(function(record) {
			return all || record.get('isMatched');
		});

		var self = this;
		$.each(records, function(i, record) {
			self.show(record);
		});

		this.partiallyHidden = !all;
	},

	// Clear list
	clear: function() {
		this.$ul.empty();
	},

	// Toogle the list to display all records or just winning ones
	toggleList: function() {
		this.partiallyHidden ? this.render() : this.render('win');
	},

	triggerNotify: function(event) {
		var cid = $(event.target).closest('li').attr('id');
		this.app.notifyView.displayResult( this.collection.getByCid(cid) );
	}
});

});