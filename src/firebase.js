import { initializeApp } from "firebase/app";
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
	setDoc,
	getFirestore,
	getDocs,
} from "firebase/firestore";

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
let db = getFirestore(app);

export const signOutGoogle = async () => {
	return await signOut(auth);
};

export const getFavorites = async (uid) => {
	return await getDocs(collection(db, "favs", uid)).then((res) =>
		console.log(res)
	);
};

export const updateDB = async (array, uid) => {
	return await setDoc(doc(db, "favs", uid), { favorites: [...array] });
};

export const loginWithGoogle = async () => {
	const googleProvider = new GoogleAuthProvider();

	return await signInWithPopup(auth, googleProvider).then((snap) => snap.user);
};
