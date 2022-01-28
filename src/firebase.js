import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAbOQcRDp7-a-qCXyYFAGuiomy0oYTv7-E",
	authDomain: "catalog-rick.firebaseapp.com",
	projectId: "catalog-rick",
	storageBucket: "catalog-rick.appspot.com",
	messagingSenderId: "998397717388",
	appId: "1:998397717388:web:7277870ee994b3462c44a9",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signOutGoogle = async () => {
	return await signOut(auth);
};

export const loginWithGoogle = async () => {
	const googleProvider = new GoogleAuthProvider();

	return await signInWithPopup(auth, googleProvider).then((snap) => snap.user);
};
