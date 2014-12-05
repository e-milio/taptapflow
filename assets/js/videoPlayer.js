$(function() {
	var firebase = new Firebase('https://taptapflow.firebaseio.com/'),
	    listRef = new Firebase('https://taptapflow.firebaseio.com/presence');

	// YOU CAN CHANGE THESE:
	var period = 5000, //length of time to watch for taps (milliseconds)
  		atpp = 15; //average taps per period

	// YOU CAN'T CHANGE THESE:
	var ctpp = 0, //current taps per period
  		userCt = 0, //current user count
  		r = 0,
  		g = 0,
  		b = 0,
  		video = document.getElementById("video");

  function init() {
    changeSpeed(ctpp, userCt);
    changeBackground(r, g, b, userCt, ctpp);
  }
	function changeSpeed(ctpp, userCt) {
		var rate = (ctpp/userCt) / atpp;
		rate = round(rate);
		video.playbackRate = rate;
		video.play();
	}
	function changeBackground(r, g, b, userCt, ctpp) {
	  rAvg = r == 0 ? 0 : Math.round(r / userCt / ctpp),
	  gAvg = g == 0 ? 0 : Math.round(g / userCt / ctpp),
	  bAvg = b == 0 ? 0 : Math.round(b / userCt / ctpp),
	  rgb = 'rgb('+rAvg+', '+gAvg+', '+bAvg+')';
	  $('body').css('background-color', rgb);
	}
	function reset() {
	  firebase.child('currentTaps').set(0);
	  firebase.child('r').set(0);
	  firebase.child('g').set(0);
	  firebase.child('b').set(0);
	  ctpp = 0,
	  r = 0,
	  g = 0,
	  b = 0;
	}
	function round(input) {
	  return (Math.round(input*100))/100;
	}
	
	//Events and listeners
	firebase.on('value', function(snapshot) {
		var data = snapshot.val();
		ctpp = data['currentTaps'];
		r = data['r'];
		g = data['g'];
		b = data['b'];
	});
	listRef.on("value", function(snap) {
	  userCt = snap.numChildren();
	});

	var tapCounter = window.setInterval(function() {
		init();
		reset();
	}, period);
	
	reset();


})