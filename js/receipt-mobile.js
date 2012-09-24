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
 	'order!jquery'
], function(
	$
) {

	// Move switch & prize elements to mobile screen
	var $mobileScreen = $('div.mobile-screen');
	$('#switch').appendTo($mobileScreen);
	$('#prize').appendTo($mobileScreen);

});