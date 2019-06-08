let database = function() {
  const firebase = require('firebase-admin');
  	if(!firebase.apps.length){
	    firebase.initializeApp({
	        credential: firebase.credential.cert('./educhat.json'),
	        databaseURL: "https://educhat-243116.firebaseio.com"
	    });
	}else{
		firebase.app();
	}
    const db = firebase.database();
    return db;
};

exports.database = database;