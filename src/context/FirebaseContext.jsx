import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { create } from "framer-motion/m";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const FirebaseContext = createContext();

const googleProvider = new GoogleAuthProvider();

// const isStrongPassword = (password) => {
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//   return regex.test(password);
// };

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

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  // await setDoc(doc(db, "users", userCredential.user.uid), {
  //   name,
  //   email,
  // });
  // await sendEmailVerification(userCredential.user);

  return userCredential;

  // return await createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

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
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
