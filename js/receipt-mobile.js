/*!
 * receipt-mobile.js
 * https://github.com/bcylin/receipt-number-checker
 *
 * Main config of loading required modules on mobile devices
 *
 * Created by Ben (c) 2012
 * Released under GNU General Public License v2
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

 require.config({
	mainConfigFile: 'receipt-mobile.js',
	baseUrl: './js',
	paths: {
		jquery : 'lib/jquery-1.7.2',
		order: 'lib/order',
		underscore : 'lib/underscore',
		backbone : 'lib/backbone'
	}
});

require([
	'order!jquery',
	'models/prizeModel',
	'views/inputView',
	'views/prizeView',
	'views/switchView',
	'views/resultView'
], function(
	$,
	PrizeModel,
	InputView,
	PrizeView,
	SwitchView,
	ResultView
) {

	// Use Mustache.js style templating
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	// Move switch & prize elements to mobile screen
	var $infoSheet = $('#info');
	$('#switch').appendTo($infoSheet);
	$('#prize').appendTo($infoSheet);


	// A global object to handle all functions
	var app = window.receiptApp ? window.receiptApp : {};

	app.prize = new PrizeModel;

	// Start loading prize data
	app.prize.init().done(function() {

		app.inputView = new InputView({
			el: '#mobile-input',
			delegate: app
		});

		app.switchView = new SwitchView({
			el: '#switch',
			delegate: app,
			dataSource: app.prize
		});

		app.prizeView = new PrizeView({
			el: '#prize',
			dataSource: app.prize
		});

		app.resultView = new ResultView({
			el: '#mobile-result'
		});

		app.prizeView.render();
		app.resultView.displayMonths( app.prize.getMonths() );

		// inputView delegate method
		// @parem {string} a number acquired from inputView
		app.inputViewDidAcquireNumber = function(num) {
			var result = this.prize.match(num);
			this.resultView.displayResult(result);
		};

		// switchView delegate method
		// @param {string} name of the selected draw
		app.switchViewDidSelectDraw = function(selectedDraw) {
			this.prize.setDraw(selectedDraw);
			this.prizeView.refresh();
			this.resultView.clearDisplay();
			this.resultView.displayMonths( this.prize.getMonths(selectedDraw) );
		};
	});
});