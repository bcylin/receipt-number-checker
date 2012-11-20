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
		'jquery' : 'lib/jquery-1.7.2',
		'underscore' : 'lib/underscore',
		'backbone' : 'lib/backbone',
		'scrollTo' : 'plugin/jquery.scrollTo',
		'bootstrap-modal' : 'plugin/bootstrap-modal',
		'bootstrap-tooltip' : 'plugin/bootstrap-tooltip',
		'bootstrap-transition' : 'plugin/bootstrap-transition'
	},
	// Configure the dependencies and exports for browser globals script
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		'scrollTo': { deps: ['jquery'] },
		'bootstrap-modal': { deps: ['jquery'] },
		'bootstrap-tooltip': { deps: ['jquery'] },
		'bootstrap-transition': { deps: ['jquery'] }
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

	app.welcomeView = new WelcomeView({ el: '#welcome' });
	app.prize = new PrizeModel;

	// Start loading prize data
	app.prize.init().done(function() {

		app.records = new RecordsCollection;

		app.inputView = new InputView({
			el: '#inputNumber',
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

		app.counterView = new CounterView({
			el: '#counter',
			delegate: app,
			collection: app.records
		});

		app.listView = new ListView({
			el: '#list',
			delegate: app,
			collection: app.records
		});

		app.notifyView = new NotifyView({
			el: '#notify',
			delegate: app,
			collection: app.records
		});

		app.prizeView.render();
		app.records
			.on('add', app.listView.showJustAdded, app.listView)
			.on('add', app.counterView.update, app.counterView)
			.on('add', app.notifyView.displayResult, app.notifyView);

		app.inputView.focus();

		// inputView delegate method
		// @parem {string} a number acquired from inputView
		app.inputViewDidAcquireNumber = function(num) {
			var result = this.prize.match(num);
			var record = new Backbone.Model(result);
			this.records.add(record);
		};

		// switchView delegate method
		// @param {string} name of the selected draw
		app.switchViewDidSelectDraw = function(selectedDraw) {
			this.prize.setDraw(selectedDraw);
			this.prizeView.refresh();
			this.inputView.focus();
		};

		// notifyView delegate method
		app.counterViewDidToggle = function() {
			this.listView.toggleList();
			this.inputView.focus();
		};

		// listView delegate method
		// @param {string} client id of Backbone model
		app.listViewDidSelectItemWithCid = function(cid) {
			this.notifyView.displayResult( this.records.getByCid(cid) );
		};

		// notifyView delegate methods
		app.notifyViewWillAppear = function() {
			this.inputView.blur();
		};

		app.notifyViewDidDismiss = function() {
			this.inputView.focus();
		};

		// Input a list of numbers for testing
		// @param {number} of inputs
		// app.autoInput = function(num) {
		// 	// Turn the sliding effect off during the action
		// 	var original = this.listView.config.effect;
		// 	this.listView.config.effect = false;
		// 	for ( var i = 0; i < num; i++ ) {
		// 		var random = ("00" + Math.floor(Math.random() * 999 + 1).toString()).slice(-3);
		// 		this.inputView.input(random);
		// 	}
		// 	this.listView.config.effect = original;
		// };

		// app.autoInput(5);
	});

});