import React from "react";
import "./HomePage.scss";
import Nav from "../../components/Nav/Nav";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Hero/>
    </div>
  );
};

export default Home;
