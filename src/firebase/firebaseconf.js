import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6evrJePiDFqVISTv5b9IZrud5A9QLkFw",
    authDomain: "productlist-35f2d.firebaseapp.com",
    projectId: "productlist-35f2d",
    storageBucket: "productlist-35f2d.appspot.com",
    messagingSenderId: "353458127422",
    appId: "1:353458127422:web:0780ce7a97af140107076f",
    measurementId: "G-55X4KXJ7GR"
  };
// Initialize Firebase
const fireb = firebase.initializeApp(firebaseConfig);
const database = fireb.firestore();

export { database }