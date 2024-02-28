import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// creating context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  const SignInWithGoogle = () => {
    localStorage.setItem('user', true);
    setUser(localStorage.getItem('user'));
    navigate('/dashboard/products');
  };

  const signOut = async () => {
    localStorage.clear();
    setUser(null);
    window.location.href='/'
  };

  const value = {
    user,
    SignInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
