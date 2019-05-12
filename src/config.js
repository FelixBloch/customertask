import firebase from'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlK4frHxIKWxBn0WD9NLB4LysQB1pqkbQ",
    authDomain: "customertask-7471a.firebaseapp.com",
    databaseURL: "https://customertask-7471a.firebaseio.com",
    projectId: "customertask-7471a",
    storageBucket: "customertask-7471a.appspot.com",
    messagingSenderId:"685140479058"};
    
    firebase.initializeApp(firebaseConfig);
    
    export const firebaseAuth=  firebase.auth;
