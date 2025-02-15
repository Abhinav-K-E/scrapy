import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Creating context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      setUserData(googleUser);
      setUid(googleUser.uid);
      localStorage.setItem("uid", googleUser.uid);
      localStorage.setItem("user", true);
      localStorage.setItem("userData", JSON.stringify(googleUser));
      setUser(localStorage.getItem("user"));

      // Store user data in Firestore
      await saveUserToFirestore(googleUser);

      navigate("/dashboard/products");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  // Save user data to Firestore
  const saveUserToFirestore = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const value = {
    user,
    userData,
    signInWithGoogle,
    logout,
    uid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
