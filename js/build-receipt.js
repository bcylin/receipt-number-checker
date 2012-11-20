({
	// node r.js -o baseUrl=. name=receipt.js out=receipt-built.js paths.jquery=lib/jquery-1.7.2.min ...
	baseUrl: '.',
	name: 'receipt.js',
	out: 'receipt-built.js',
	paths: {
		'jquery' : 'lib/jquery-1.7.2.min',
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