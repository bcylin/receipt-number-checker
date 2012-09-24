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
	'views/prizeView',
	'views/switchView',
], function(
	$,
	PrizeModel,
	PrizeView,
	SwitchView
) {

	// Use Mustache.js style templating
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	// Move switch & prize elements to mobile screen
	var $mobileScreen = $('div.mobile-screen');
	$('#switch').appendTo($mobileScreen);
	$('#prize').appendTo($mobileScreen);

	// A global object to handle all functions
	var app = window.receiptApp ? window.receiptApp : {};

	app.prize = new PrizeModel;

	// Start loading prize data
	app.prize.init().done(function() {

		app.switchView = new SwitchView({
			el: '#switch',
			delegate: app,
			dataSource: app.prize
		});

		app.prizeView = new PrizeView({
			el: '#prize',
			dataSource: app.prize
		});

		app.prizeView.render();

		// switchView delegate method
		app.switchViewDidSelectDraw = function(selectedDraw) {
			this.prize.setDraw(selectedDraw);
			this.prizeView.refresh();
		};

	});

});