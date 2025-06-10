// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXliBoCsSFVms0l8StObIi7WW8nm4AGio",
  authDomain: "ia-libros-adaeb.firebaseapp.com",
  projectId: "ia-libros-adaeb",
  storageBucket: "ia-libros-adaeb.firebasestorage.app",
  messagingSenderId: "196175493792",
  appId: "1:196175493792:web:0ea7b6e907f96c06d6a7c5",
  measurementId: "G-TERHT23P8S"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
