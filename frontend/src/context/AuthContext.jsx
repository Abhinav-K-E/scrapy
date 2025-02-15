import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
// creating context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  // const SignInWithGoogle = () => {
  //   localStorage.setItem("user", true);
  //   setUser(localStorage.getItem("user"));
  //   navigate("/dashboard/products");
  // };

  // const signOut = async () => {
  //   localStorage.clear();
  //   setUser(null);
  //   window.location.href = "/";
  // };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserData(result.user);
      localStorage.setItem("user", true);
      localStorage.setItem("userData", JSON.stringify(result.user));
      setUser(localStorage.getItem("user"));
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
