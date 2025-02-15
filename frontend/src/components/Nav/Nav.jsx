import React from "react";
import "./Nav.scss";

import LOGO from "../../assets/images/logo.svg";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <nav className="nav">
      <div className="logo">
        <img src={LOGO} alt="" />
      </div>
      <div className="login-btn" onClick={() => signInWithGoogle()}>
        Login
      </div>
    </nav>
  );
};

export default Nav;
