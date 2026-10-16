import { createContext, useContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

const FirebaseContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence);

    // Mobile browser detection
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      await signInWithRedirect(auth, googleProvider);
      return;
    }

    // Desktop browser
    return await signInWithPopup(auth, googleProvider);
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    let active = true;

    const checkRedirect = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Google redirect login error:", error);
      }
    };

    checkRedirect();

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (active) {
          setUser(currentUser);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Authentication state error:", error);

        if (active) {
          setLoading(false);
        }
      },
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signInWithGoogle,
    logoutUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebase must be used inside FirebaseProvider");
  }

  return context;
};
