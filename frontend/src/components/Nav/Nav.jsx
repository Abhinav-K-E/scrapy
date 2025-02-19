import React from "react";
import "./Nav.scss";

import LOGO from "../../assets/images/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <div className="logo">
        <img src={LOGO} alt="" />
      </div>
      <div
        className="login-btn"
        onClick={() => {
          if (user) {
            navigate("/dashboard/products");
          } else {
            signInWithGoogle();
          }
        }}
      >
        {user == "true" ? "Dashboard" : "Login"}
      </div>
    </nav>
  );
};

export default Nav;
