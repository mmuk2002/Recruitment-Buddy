// client/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJhwUu9MaNwJwPBNwogGdDEXIm-sXVwmA",
    authDomain: "recruitmentbuddy-ed4f0.firebaseapp.com",
    projectId: "recruitmentbuddy-ed4f0",
    storageBucket: "recruitmentbuddy-ed4f0.appspot.com",
    messagingSenderId: "109123436621",
    appId: "1:109123436621:web:fe98f7723bdfcd52201c04"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const signIn = signInWithEmailAndPassword;

export { app, db, auth, signIn };