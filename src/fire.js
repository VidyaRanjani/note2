import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBnDie1bdwT2Y2NJDivAKg5JqRXO2X_st8",
    authDomain: "notes-dbea3.firebaseapp.com",
    databaseURL: "https://notes-dbea3-default-rtdb.firebaseio.com",
    projectId: "notes-dbea3",
    storageBucket: "notes-dbea3.appspot.com",
    messagingSenderId: "945133063158",
    appId: "1:945133063158:web:dcfe7024bffb808a8015d7",
    measurementId: "G-C50JHYS8Z3"
  };
  
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

 
  
  export default fire;
 