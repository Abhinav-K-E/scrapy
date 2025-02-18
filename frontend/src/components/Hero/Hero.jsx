import React from "react";
import HERO from "../../assets/hero.svg";
import { useAuth } from "../../context/AuthContext";
const Hero = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="hero">
      <img src={HERO} className="hero-img" alt="" />
      <div className="get-btn-container" onClick={() => signInWithGoogle()}>
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
    </div>
  );
};

export default Hero;
