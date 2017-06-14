import './firebaseConfig';
import firebase from 'firebase';

export default function firebaseSignIn (email, password) {
  return new Promise(function(resolve, reject) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          console.log("You have successfully signed up: " + firebase.auth().currentUser.uid);
          var userRef = firebase.database().ref("Players/" + firebase.auth().currentUser.uid);
          resolve(userRef);
        }
        else{

        }
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
}