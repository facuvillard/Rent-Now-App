import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBzyvTgVKA8KX-pT_wu7TBBUrp6BfM8bNs',
	authDomain: 'rent-now-13046.firebaseapp.com',
	databaseURL: 'https://rent-now-13046.firebaseio.com',
	projectId: 'rent-now-13046',
	storageBucket: 'rent-now-13046.appspot.com',
	appId: '1:501335176849:web:037582dc95752eb1c83130',
	measurementId: 'G-YZ7YZVJ0RF',
};
let firebaseApp;
if (firebase.apps.length === 0) {
	firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	firebaseApp = firebase.apps[0];
}

export const loginWithGmail = () => {
	const gmailProvider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(gmailProvider);
};

export default firebaseApp;
