import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQefrifcSemFMkIqDPZ_pRhm6-HYh78FQ",
  authDomain: "movienest-39356.firebaseapp.com",
  projectId: "movienest-39356",
  storageBucket: "movienest-39356.firebasestorage.app",
  messagingSenderId: "420281062903",
  appId: "1:420281062903:web:595483789b99798539caf2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
