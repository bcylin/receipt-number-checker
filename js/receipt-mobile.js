/*!
 * receipt-mobile.js
 * https://github.com/bcylin/receipt-number-checker
 *
 * Main config of loading required modules on mobile devices
 *
 * Created by Ben <@bcylin> (c) 2012
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */

require.config({
  mainConfigFile: 'receipt-mobile.js',
  baseUrl: './js',
  paths: {
    jquery : 'lib/jquery',
    order: 'lib/order',
    underscore : 'lib/underscore',
    backbone : 'lib/backbone'
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
    }
  }
});

require([
  'jquery',
  'models/prizeModel',
  'views/titleView',
  'views/inputView',
  'views/prizeView',
  'views/switchView',
  'views/resultView'
], function(
  $,
  PrizeModel,
  TitleView,
  InputView,
  PrizeView,
  SwitchView,
  ResultView
) {

  // Hide the address bar after launched on mobile browsers
  $(document).ready(function() {
    setTimeout(function() { window.scrollTo(0, 0); }, 500);
  });

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

    app.titleView = new TitleView({
      el: '#mobile-title'
    });

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

    // inputView delegate method
    // @parem {string} a number acquired from inputView
    app.inputViewDidAcquireNumber = function(num) {
      var result = this.prize.match(num);
      this.titleView.changeTitleForResult(result);
      this.resultView.displayResult(result);
    };

    // switchView delegate method
    // @param {string} name of the selected draw
    app.switchViewDidSelectDraw = function(selectedDraw) {
      this.prize.setDraw(selectedDraw);
      this.prizeView.refresh();
      this.titleView.resetTitle();
      this.resultView.clearDisplay();
    };

    // Keep the address bar hidden
    $('#mobile-input').on('focus', function() {
      setTimeout(function() { window.scrollTo(0, 0); }, 0);
    });
  });
});
