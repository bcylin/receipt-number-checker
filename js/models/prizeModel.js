/**
 * models/prizeModel.js
 * Module that handles all functions relative to winning numbers
 *
 * @return	{function} constructor
 * @author  Ben on 10/Jul/2012
 */

define([
	'jquery',
	'backbone',
	'models/drawModel'
], function($, unused, DrawModel) {

return function() {

	var _draw = 'thisDraw';	// Default draw
	var _current = {
		thisDraw: undefined,
		prevDraw: undefined
	};

	this.init = function(config) {

		this.options = $.extend( {}, this.defaults, config );
		this.initializing = new $.Deferred();
		_current.thisDraw = new DrawModel();
		_current.prevDraw = new DrawModel();

		var self = this;
		// load data of winning numbers
		$.ajax({
			url: self.options.url || 'data/numbers.json',
			dataType: 'json',
			success: function(data) {
				var keys = Object.keys(data).sort();

				// Fix the order of January and November
				if (keys[0] === "01-02月" && keys[1] === "11-12月") {
					keys.reverse();
				}

				_current.prevDraw.setData({
					months: keys[0],
					prizes: data[keys[0]]
				});
				_current.thisDraw .setData({
					months: keys[1],
					prizes: data[keys[1]]
				});
				self.initializing.resolve();
			},
			error: function(data) {
				console.log('Fail fetching data from file: ' + this.url);
				// set winning numbers manually
				_current.thisDraw.setData({
					months: "測試1",
					prizes: {
						'特別獎': ['11112222'],
						'特獎': ['22221111'],
						'頭獎至六獎': ['333'],
						'增開六獎': ['444']
					}
				});
				_current.prevDraw.setData({
					months: "測試2",
					prizes: {
						'特別獎': ['AAAABBBB'],
						'特獎': ['BBBBAAAA'],
						'頭獎至六獎': ['CCC'],
						'增開六獎': ['DDD']
					}
				});
				self.initializing.resolve();
			}
		});
		return this.initializing.promise();
	};


	// accessors
	this.getDraw = function() {
		return _draw;
	};
	this.setDraw = function(newDraw) {
		if (newDraw === 'thisDraw' || newDraw === 'prevDraw') {
			_draw = newDraw;
			return true;
		} else {
			return false
		}
	};

	// @param {string} which draw
	// @return {object} prize index-name mapping
	this.getPrizeNameIDMapping = function(whichDraw) {
		var draw = !whichDraw ? _draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return _current[draw].get('prizeNameOfID');
	};

	// @param {string} which draw
	// @return {string} name of the months
	this.getMonths = function(whichDraw) {
		var draw = !whichDraw ? _draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return _current[draw].get('months');
	};

	// @param {string} which draw
	// @return {object} each array of winning numbers
	this.getNumberList = function(whichDraw) {
		var draw = !whichDraw ? _draw :
					(whichDraw === 'thisDraw' || whichDraw === 'prevDraw') ? whichDraw : draw;
		return _current[draw].get('numberList');
	};

	// @param {string} winning number
	// @return {string} prize name
	this.prizeNameOfNumber = function(winNumber) {
		return _current[_draw].get('prizeNameOfNumber')[winNumber];
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
			months: _current[_draw].get('months'),
			matchType: undefined,
			matchedNumber: undefined,
			prizeName: undefined
		};
		var type = ['matchAll', 'matchThree'];

		$.each(type, function(i, matchType) {
			$.each(_current[_draw].get(matchType), function(i, winNumber) {
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
