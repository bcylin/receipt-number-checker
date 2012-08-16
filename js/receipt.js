/*!
 * receipt.js
 * https://github.com/bcylin/receipt-number-checker
 *
 * Main config of loading required modules using RequireJS 1.0.8
 *
 * Created by Ben (c) 2012
 * Released under GNU General Public License v2
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

require.config({
	mainConfigFile: 'receipt.js',
	baseUrl: './js',
	paths: {
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
	'models/prizeModel',
	'collections/recordsCollection',
	'views/welcomeView',
	'views/prizeView',
	'views/switchView',
	'views/inputView',
	'views/counterView',
	'views/listView',
	'views/notifyView',
	// 'views/signature',
	// 'views/share'
], function(
	PrizeModel,
	RecordsCollection,
	WelcomeView,
	PrizeView,
	SwitchView,
	InputView,
	CounterView,
	ListView,
	NotifyView
){

	// Use Mustache.js style templating
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

	// A global object to handle all functions
	var app = window.receiptApp ? window.receiptApp : {};

	// Fix font and github ribbon on Windows
	if ( navigator.userAgent.match(/Windows/i) ) {
		document.body.className = document.body.className + " windows";
		document.getElementById('ribbon').className = "hidden";

		var ribbon = document.getElementById('github-ribbon');
		ribbon.src = "https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png";
		ribbon.className = "";
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
			.on('add', app.listView.showJustAdded, app.listView)
			.on('add', app.counterView.update, app.counterView)
			.on('add', app.notifyView.displayResult, app.notifyView);

		app.inputView.focus();

		// var randoms = [];
		// for ( var i = 0; i < 100; i++ ) {
		// 	randoms.push( ("00" + Math.floor(Math.random() * 999 + 1).toString()).slice(-3) );
		// }
		// app.inputView.autoInput(randoms);
	});

});