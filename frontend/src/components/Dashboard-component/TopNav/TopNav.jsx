import React, { useEffect, useState } from "react";
import "./TopNav.scss";
import { searchScrap } from "../../../utils/searchScrap";
import { fetchAllData } from "../../../utils/getAllScraps";
import { useAuth } from "../../../context/AuthContext";

const TopNav = ({ search, setSearch, setLoader, setProducts, products }) => {
  const [userData, setUserData] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { setUid } = useAuth();
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setUserData(data);
      console.log(data);
      setUid(data.uid);
      localStorage.setItem("uid", data.uid); // Fixed: was using getItem instead of setItem
    }
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

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Get user initials for fallback avatar
  const getUserInitials = () => {
    if (!userData || !userData.displayName) return "U";
    const nameParts = userData.displayName.split(" ");
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
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
          {userData && (
            <>
              {!imageError && userData.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  className="profile-pic"
                  onError={handleImageError}
                  alt={userData.displayName || "User"}
                />
              ) : (
                <div className="profile-pic-fallback">
                  {getUserInitials()}
                </div>
              )}
              <div className="profile-name">{userData.displayName || "User"}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;