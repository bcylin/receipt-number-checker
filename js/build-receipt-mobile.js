({
	// node r.js -o baseUrl=. name=receipt-mobile.js out=receipt-mobile-built.js paths.jquery=lib/jquery-1.7.2.min ...
	baseUrl: '.',
	name: 'receipt-mobile.js',
	out: 'receipt-mobile-built.js',
	paths: {
		'jquery' : 'lib/jquery-1.7.2.min',
		'underscore' : 'lib/underscore.min',
		'backbone' : 'lib/backbone.min'
	},
	// the file where to find the shim config
	mainConfigFile: 'receipt-mobile.js'
})