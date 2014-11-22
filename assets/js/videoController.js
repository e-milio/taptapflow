$(function() {

	var firebase = new Firebase('https://taptapflow.firebaseio.com/');

	// YOU CAN CHANGE THESE:
	var period = 10000, //length of time to watch for taps (milliseconds)
		atpp = 15; //average taps per period

	// YOU CAN'T CHANGE THESE:
	var ctpp = 0; //current taps per period

	var tapCounter = window.setInterval(function() {
		console.log('running the tap counter interval');
		firebase.child('gtpp').transaction(function(current_value) {
			console.log('Changing the firebase gtpp value... it is currently set to', current_value);
			console.log('setting it to... ', current_value + ctpp);
			return current_value + ctpp;
		}, function() {
			console.log('Finished transaction. Resetting ctpp');
			ctpp = 0;
		});
		firebase.child('userCt').transaction(function(current_value) {
			return (current_value || 0) + 1;
		});
	}, period);

	$(document).click(function() {
		ctpp++;
		console.log(ctpp, 'taps counted for this user\'s period')
	});
})