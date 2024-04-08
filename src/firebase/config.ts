// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCMw7zbEVy7ygptwSKDfGUwse9Fu44LiIk",
	authDomain: "virtual-crowd.firebaseapp.com",
	projectId: "virtual-crowd",
	storageBucket: "virtual-crowd.appspot.com",
	messagingSenderId: "294598685315",
	appId: "1:294598685315:web:fd01fb0e35979359d121b6",
	measurementId: "G-H55EZVXE8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { db, auth }