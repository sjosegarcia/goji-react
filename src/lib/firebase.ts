import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const firebaseAuthProviders = firebase.auth;
export const googleAuth = new firebaseAuthProviders.GoogleAuthProvider();
export const appleAuth = new firebaseAuthProviders.OAuthProvider('apple.com');
export default firebaseApp;
