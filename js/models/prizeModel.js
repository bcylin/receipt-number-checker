/**
 * models/prizeModel.js
 * Module that handles all functions relative to winning numbers
 *
 * @return	{function} constructor
 * @author  Ben on 10/Jul/2012
 */

define([
	'order!jquery',
	'order!underscore',
	'order!backbone',
	'order!models/drawModel'
], function($, unused, unused, DrawModel) {

return function() {

	var draw = 'thisDraw';	// Default draw
	var current = {
		thisDraw: undefined,
		prevDraw: undefined
	};

	this.defaults = {
		// data resource
		urls: {
			thisDraw: "http://invoice.etax.nat.gov.tw/etaxinfo_1.htm",
			prevDraw: "http://invoice.etax.nat.gov.tw/etaxinfo_2.htm"
		}
	};

	this.initializing = new $.Deferred();
	this.init = function(config) {

		var self = this;
		self.options = $.extend( {}, self.defaults, config );
		current.thisDraw = new DrawModel({ url: self.options.urls.thisDraw });
		current.prevDraw = new DrawModel({ url: self.options.urls.prevDraw });

		// determine when the initializing is done
		var isDone = false;
		current.thisDraw.fetching.done(function() {
			if (isDone) { self.initializing.resolve(); }
			isDone = true;
		}).fail(function() {
			// set winning numbers manually
			current.thisDraw.setData({
				months: "測試1",
				prizes: {
					'特別獎': ['11112222'],
					'特獎': ['22221111'],
					'頭獎至六獎': ['333'],
					'增開六獎': ['444']
				}
			});
			console.log(current.thisDraw.toJSON());
			if (isDone) { self.initializing.resolve(); }
			isDone = true;
		});

		current.prevDraw.fetching.done(function() {
			if (isDone) { self.initializing.resolve(); }
			isDone = true;
		}).fail(function() {
			// set winning numbers manually
			current.prevDraw.setData({
				months: "測試2",
				prizes: {
					'特別獎': ['AAAABBBB'],
					'特獎': ['BBBBAAAA'],
					'頭獎至六獎': ['CCC'],
					'增開六獎': ['DDD']
				}
			});
			console.log(current.thisDraw.toJSON());
			if (isDone) { self.initializing.resolve(); }
			isDone = true;
		});

		return this.initializing.promise();
	};


	// accessors
	this.getDraw = function() {
		return draw;
	};
	this.setDraw = function(newDraw) {
		if (newDraw === 'thisDraw' || newDraw === 'prevDraw') {
			draw = newDraw;
			return true;
		} else {
			return false
		}
	};

	// @param {string} which draw
	// @return {object} prize index-name mapping
	this.getMapping = function(whichDraw) {
		var _draw = !whichDraw ? draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return current[_draw].get('prizeNameOfID');
	};

	// @param {string} which draw
	// @return {string} name of the months
	this.getMonths = function(whichDraw) {
		var _draw = !whichDraw ? draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return current[_draw].get('months');
	};

	// @param {string} which draw
	// @return {object} each array of winning numbers
	this.getList = function(whichDraw) {
		var _draw = !whichDraw ? draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return current[_draw].get('numberList');
	};

	// @param {string} which draw
	// @return {array} of all winning numbers
	this.getAllNumbers = function(whichDraw) {
		var _draw = !whichDraw ? draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return $.map(this.getList(), function(numbers, id) {
			return numbers;
		});
	};

	// @param {string} winning number
	// @return {string} prize name
	this.prizeNameOfNumber = function(winNumber) {
		return current[draw].get('prizeNameOfNumber')[winNumber];
	};

	// Match the given number to see if it's winning
	// @param {string | number} a 3-digit number
	// @return {object} result that contains matchType and matchedNumber
	this.match = function(num) {
		num = num.toString();
		var self = this;
		var result = {
			isMatched: false,
			num: num,
			months: current[draw].get('months'),
			matchType: undefined,
			matchedNumber: undefined,
			prizeName: undefined
		};
		var type = ['matchAll', 'matchThree'];

		$.each(type, function(i, matchType) {
			$.each(current[draw].get(matchType), function(i, winNumber) {
				// match the last three digits
				var match = winNumber.substr(winNumber.length - 3, 3);
				if (num === match) {
					result.isMatched = true;
					result.matchType = matchType;
					result.matchedNumber = winNumber;
					result.prizeName = self.prizeNameOfNumber(winNumber);
				}
			});
		});
		return result;
	};
};

});