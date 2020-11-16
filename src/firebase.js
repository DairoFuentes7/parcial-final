import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCijJFv6cvrkldFArHloQdOp3sk7MIAgGg",
    authDomain: "parcialfinal-848a0.firebaseapp.com",
    databaseURL: "https://parcialfinal-848a0.firebaseio.com",
    projectId: "parcialfinal-848a0",
    storageBucket: "parcialfinal-848a0.appspot.com",
    messagingSenderId: "1040527310842",
    appId: "1:1040527310842:web:93811be65e753d82c1ae43"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();