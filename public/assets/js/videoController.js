$(function() {

	var firebase = new Firebase('https://taptapflow.firebaseio.com/'),
	    listRef = new Firebase('https://taptapflow.firebaseio.com/presence'),
	    userRef = listRef.push();
	    presenceRef = firebase.child('.info').child('connected');
	    
	//Add current user to presenceRef
	presenceRef.on('value', function(snapshot) {
	  if (snapshot.val()) {
	    userRef.set(true);
	    //Remove when they disconnect
	    userRef.onDisconnect().remove();
	  }
	});
	
	listRef.on("value", function(snap) {
	  console.log("# of online users = " + snap.numChildren());
	});    
	
	$(document).click(function() {
	  firebase.child('currentTaps').transaction(function(current_value) {
			return current_value + 1;
		});
	});
})