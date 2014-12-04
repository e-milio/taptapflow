$(function() {
	var firebase = new Firebase("https://taptapflow.firebaseio.com/");

	// YOU CAN CHANGE THESE:
	var period = 10000, //length of time to watch for taps (milliseconds)
		atpp = 15; //average taps per period

	// YOU CAN'T CHANGE THESE:
	var ctpp = 0, //current taps per period
		userCt = 0, //current user count
		video = document.getElementById("video");

	firebase.on('value', function(snapshot) {
		console.log(snapshot.val());
		var data = snapshot.val();
		ctpp = data['gtpp'];
		userCt = data['userCt'];
	});

	var tapCounter = window.setInterval(function() {
		changeSpeed(ctpp, userCt);
		ctpp = 0;
		window.setTimeout(function() {
			console.log('here is where we should be resetting firebases values');
			firebase.set({
				'gtpp': 0,
				'userCt': 0
			});
		}, 5000);
	}, period);


	function changeSpeed(ctpp, userCt) {
		console.log('Counted', ctpp, 'taps in this period');
		console.log('There are ', userCt, 'users online');
		var rate = (ctpp/userCt) / atpp;

		console.log('playback rate before manipulation', rate);

		if(rate > 4.0) {
			rate = 4.0;
		} else if(0 < rate <= 0.5){
			rate = 0.5;
		} else {
			rate = rate;
		}

		// if(0.5 <= rate <= 4.0) {
		// 	console.log('right where it needs to be');
		// 	console.log('greater than .5?', 0.5<=rate);
		// 	console.log('less than 4.0?', rate<=4.0);
		// 	rate = rate;
		// } else if(rate > 4.0) {
		// 	console.log('over 4.0... scaling down');
		// 	rate = 4.0;
		// } else {
		// 	console.log('too small');
		// 	rate = 0.5;
		// }

		console.log('playback rate after manipulation', rate);

		video.playbackRate = rate;
  		video.play();
	}


})