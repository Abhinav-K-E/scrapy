import React, { useEffect, useState } from "react";
import "./TopNav.scss";
import { searchScrap } from "../../../utils/searchScrap";
import { fetchAllData } from "../../../utils/getAllScraps";

const TopNav = ({ search, setSearch, setLoader, setProducts, products }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, []);

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      setSearch(search);
      console.log(search);
      setLoader(true);
      // Call your search function here
      if (search.length > 0) {
        const res = await searchScrap(search);
        console.log(res);
        setProducts(res);
      } else {
        const res = await fetchAllData("scraps");
        setProducts(res);
        console.log("no result");
      }
      setLoader(false);
    }
  };

  return (
    <div className="dash-top-nav">
      <div className="dash-top-left">
        <div className="search-bar">
          <svg
            width={25}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.904 21.75c-5.65 0-10.25-4.6-10.25-10.25s4.6-10.25 10.25-10.25 10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22.404 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
              fill="#A1A2AF"
            />
          </svg>
          <input
            placeholder="Enter your item"
            type="text"
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="dash-top-right">
        <div className="profile">
          <img src={`${userData?.photoURL}`} className="profile-pic"></img>
          <div className="profile-name">{userData?.displayName}</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
