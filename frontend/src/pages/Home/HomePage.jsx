import React from "react";
import "./HomePage.scss";
import Nav from "../../components/Nav/Nav";
import fetchAxios from "../../fetchAxios/fetchAxios";
const Home = () => {
  const handleTest = async () => {
    const res = await fetchAxios.get("/api/test");
    console.log(res.data.message);
  };
  return (
    <div className="home">
      <Nav />
      <button onClick={handleTest}>test</button>
    </div>
  );
};

export default Home;
