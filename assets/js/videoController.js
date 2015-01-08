$(function() {

	var firebase = new Firebase('https://taptapflow.firebaseio.com/'),
	    listRef = new Firebase('https://taptapflow.firebaseio.com/presence'),
	    userRef = listRef.push();
	    presenceRef = firebase.child('.info').child('connected'),
	    ctppRef = firebase.child('currentTaps'),
	    rRef = firebase.child('r'),
	    gRef = firebase.child('g'),
	    bRef = firebase.child('b');
	    
	function getRand(min, max) {
    var rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
	};
	function getColor() {
	  var r = getRand(0, 255),
	      g = getRand(0, 255),
	      b = getRand(0, 255),
	      rgb = 'rgb('+r+', '+g+', '+b+')',
	      color = {'r':r, 'g':g, 'b':b, 'rgb':rgb};
	  return color;
	}
	
	//Add current user to presenceRef
	presenceRef.on('value', function(snapshot) {
	  if (snapshot.val()) {
	    userRef.set(true);
	    //Remove when they disconnect
	    userRef.onDisconnect().remove();
	  }
	});
	
	$(document).click(function() {
	  var color = getColor();
	  $('body').css('background-color', color.rgb);  
	  ctppRef.transaction(function(current_value) {
			return current_value + 1;
		});
		rRef.transaction(function(val) {
		  return val + color.r;
		});
		gRef.transaction(function(val) {
		  return val + color.g;
		});
		bRef.transaction(function(val) {
		  return val + color.b;
		});
	});
})