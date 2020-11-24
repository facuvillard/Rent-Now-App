import firebase from 'firebase'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzyvTgVKA8KX-pT_wu7TBBUrp6BfM8bNs",
    authDomain: "rent-now-13046.firebaseapp.com",
    databaseURL: "https://rent-now-13046.firebaseio.com",
    projectId: "rent-now-13046",
    storageBucket: "rent-now-13046.appspot.com",
    messagingSenderId: "501335176849",
    appId: "1:501335176849:web:037582dc95752eb1c83130",
    measurementId: "G-YZ7YZVJ0RF"
})

export default firebaseApp;