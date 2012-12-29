({
	// node r.js -o baseUrl=. name=receipt-mobile.js out=receipt-mobile-built.js paths.jquery=lib/jquery.min ...
	baseUrl: '.',
	name: 'receipt-mobile.js',
	out: 'receipt-mobile-built.js',
	paths: {
		'jquery' : 'lib/jquery.min',
		'underscore' : 'lib/underscore.min',
		'backbone' : 'lib/backbone.min'
	},
	// the file where to find the shim config
	mainConfigFile: 'receipt-mobile.js'
})