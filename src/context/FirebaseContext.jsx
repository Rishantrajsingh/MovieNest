import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "framer-motion/m";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const FirebaseContext = createContext();

const googleProvider = new GoogleAuthProvider();

// const isStrongPassword = (password) => {
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//   return regex.test(password);
// };

//** SIGNUP USER */

const signUpUser = async (name, email, password) => {
  // if (!isStrongPassword(password)) {
  //   throw new Error(
  //     "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  //   );
  // }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name,
  });

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
  });

  return user;
};

// ** LOGIN USER

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ** CONTINUE WITH GOOGLE

const signInWithGoogle = async () => {
  // return signInWithPopup(auth, googleProvider);
  const userCredential = await signInWithPopup(auth, googleProvider);

  const user = userCredential.user;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  // Sirf pehli baar save hoga
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      name: user.displayName,
      email: user.email,
      provider: "google",
    });
  }

  return userCredential;
};

// ** LOGOUT USER

const logoutUser = async () => {
  return await signOut(auth);
};

// ** FIREBASE PROVIDER

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const value = {
    signUpUser,
    signInUser,
    signInWithGoogle,
    user,
    logoutUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// ** CUSTOM HOOK

export const useFirebase = () => useContext(FirebaseContext);
