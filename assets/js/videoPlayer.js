$(function() {
	var firebase = new Firebase('https://taptapflow.firebaseio.com/'),
	    listRef = new Firebase('https://taptapflow.firebaseio.com/presence');

	// YOU CAN CHANGE THESE:
	var period = 10000, //length of time to watch for taps (milliseconds)
  		atpp = 15; //average taps per period

	// YOU CAN'T CHANGE THESE:
	var ctpp = 0, //current taps per period
  		userCt = 0, //current user count
  		video = document.getElementById("video");

	firebase.on('value', function(snapshot) {
		var data = snapshot.val();
		ctpp = data['currentTaps'];
	});
	
	listRef.on("value", function(snap) {
	  userCt = snap.numChildren();
	});

	var tapCounter = window.setInterval(function() {
		changeSpeed(ctpp, userCt);
		firebase.child('currentTaps').set(0);
	}, period);


	function changeSpeed(ctpp, userCt) {
	  console.log('CHANGING PLAYBACK RATE');
		console.log('Counted', ctpp, 'taps in this period');
		console.log('There are ', userCt, 'users online');
		
		var rate = (ctpp/userCt) / atpp;
		
		console.log('Video\'s playback rate is ', rate);

		video.playbackRate = rate;
		video.play();
	}


})