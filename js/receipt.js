/*!
 * receipt.js
 * Main config of loading required modules using RequireJS 1.0.8
 *
 * Created by Ben (c) 2012
 * Licensed under GNU General Public License v2
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

require.config({
	mainConfigFile: 'receipt.js',
	baseUrl: './js',
	paths: {
		// jquery : 'http://code.jquery.com/jquery-1.7.2.min.js',
		// order: 'http://requirejs.org/docs/release/1.0.5/minified/order.js',
		// underscore : 'http://underscorejs.org/underscore-min.js',
		// backbone : 'http://backbonejs.org/backbone-min.js',
		jquery : 'lib/jquery-1.7.2',
		order: 'lib/order',
		underscore : 'lib/underscore',
		backbone : 'lib/backbone',
		scrollTo : 'plugin/jquery.scrollTo',
		'bootstrap-modal' : 'plugin/bootstrap-modal',
		'bootstrap-tooltip' : 'plugin/bootstrap-tooltip',
		'bootstrap-transition' : 'plugin/bootstrap-transition'
	}
});

require([
	'order!jquery',
	'order!underscore',
	'order!backbone',
	'order!models/prizeModel',
	'order!collections/recordsCollection',
	'order!views/welcomeView',
	'order!views/prizeView',
	'order!views/switchView',
	'order!views/inputView',
	'order!views/counterView',
	'order!views/listView',
	'order!views/notifyView',
	'order!views/mobileView',
	// 'views/signature'
], function(
	$,
	unused,
	unused,
	PrizeModel,
	RecordsCollection,
	WelcomeView,
	PrizeView,
	SwitchView,
	InputView,
	CounterView,
	ListView,
	NotifyView,
	MobileView
){

	// Use Mustache.js style templating
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	// A global object to handle every function
	var app = window.receiptApp = {};

	// Display a different message for mobile devices
	if ( app.mobile = navigator.userAgent.match(/Android|BlackBerry|iPad|iPhone|iPod|webOS/i) ) {
		var mobileView = new MobileView({ el: 'body' });
		return;
	}

	app.welcomeView = new WelcomeView({ el: '#welcome' });
	app.prize = new PrizeModel;

	// Start loading prize data
	app.prize.init().done(function() {

		app.records = new RecordsCollection;

		app.inputView = new InputView({
			el: '#input',
			collection: app.records
		});

		app.switchView = new SwitchView({
			el: '#switch'
		});

		app.prizeView = new PrizeView({
			el: '#prize',
			model: app.prize
		});

		app.counterView = new CounterView({
			el: '#counter',
			collection: app.records
		});

		app.listView = new ListView({
			el: '#list',
			collection: app.records
		});

		app.notifyView = new NotifyView({
			el: '#notify',
			collection: app.records
		});

		app.prizeView.render();
		app.records
			.on('add', app.listView.showAdded, app.listView)
			.on('add', app.counterView.update, app.counterView)
			.on('add', app.notifyView.displayWin, app.notifyView);

		app.inputView.focus();

		// app.inputView.autoInput([123, 234, 345, 984, 229, 860, '021', 123]);
	});

});