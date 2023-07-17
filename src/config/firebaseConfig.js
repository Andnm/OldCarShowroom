// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9G2aKUIdKV2lsUy_RO9uxWPJwVYQTm4M",
  authDomain: "vehicle-rental-app-34efb.firebaseapp.com",
  projectId: "vehicle-rental-app-34efb",
  storageBucket: "vehicle-rental-app-34efb.appspot.com",
  messagingSenderId: "646178805601",
  appId: "1:646178805601:web:3b15b33b86e840a1b81720",
  measurementId: "G-D48XX22SR0",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase}