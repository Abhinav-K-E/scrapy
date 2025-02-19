import React from "react";
import HERO from "../../assets/hero.svg";
import { useAuth } from "../../context/AuthContext";

import HEROSVG from "../../assets/heropic.svg";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="hero">
      <img src={HERO} className="hero-img" alt="" />
      <div
        className="get-btn-container"
        onClick={() => {
          if (user) {
            navigate("/dashboard/products");
          } else {
            signInWithGoogle();
          }
        }}
      >
        <div className="txt">Get Started</div>
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={31}
            fill="none"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              strokeWidth={1.6}
              d="m20.211 19.205 2.037-7.6-7.601-2.037M8.752 19.396l13.36-7.714"
            />
          </svg>
        </div>
      </div>
      <img className="main-img" src={HEROSVG} alt="" />
    </div>
  );
};

export default Hero;
