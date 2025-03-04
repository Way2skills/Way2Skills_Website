import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCw96aRPnwP0H9FGyAqOvI4rwkSxouiUU",
    authDomain: "reviews-24384.firebaseapp.com",
    projectId: "reviews-24384",
    storageBucket: "reviews-24384.firebasestorage.app",
    messagingSenderId: "532577046914",
    appId: "1:532577046914:web:4dbf025c5c37d289cd3f9b",
    measurementId: "G-Y0CW1QTHZY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };
