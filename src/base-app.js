import Rebase from "re-base";
import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

// Auth
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA2QxyFxyvcekg3dOP1Dh45EBm734ZIDXQ",
    authDomain: "storeapp-a07b3.firebaseapp.com",
    databaseURL: "https://storeapp-a07b3.firebaseio.com"
});

// create the firebase binding
const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;

https://storeapp-a07b3.firebaseapp.com/__/auth/handler

