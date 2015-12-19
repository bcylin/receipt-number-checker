({
  // node r.js -o baseUrl=. name=receipt.js out=receipt-built.js paths.jquery=lib/jquery.min ...
  baseUrl: '.',
  name: 'receipt.js',
  out: 'receipt-built.js',
  paths: {
    'jquery' : 'lib/jquery.min',
    'underscore' : 'lib/underscore.min',
    'backbone' : 'lib/backbone.min',
    'scrollTo' : 'plugin/jquery.scrollTo.min',
    'bootstrap-modal' : 'plugin/bootstrap-modal',
    'bootstrap-tooltip' : 'plugin/bootstrap-tooltip',
    'bootstrap-transition' : 'plugin/bootstrap-transition'
  },
  // the file where to find the shim config
  mainConfigFile: 'receipt.js'
})
