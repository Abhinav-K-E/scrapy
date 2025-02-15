import React, { useState, useEffect } from "react";
import "./MyScrapsPage.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const MyScrapsPage = () => {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = useAuth();

  useEffect(() => {
    const fetchUserScraps = async (uid) => {
      try {
        const scrapsRef = collection(db, "scraps"); // Update collection name if needed
        const q = query(scrapsRef, where("userId", "==", uid)); // Fetch only user's scraps

        const querySnapshot = await getDocs(q);
        const userScraps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setScraps(userScraps);
      } catch (error) {
        console.error("Error fetching user's scraps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserScraps(uid);
  }, []);

  return (
    <div className="my-scraps">
      <h2>My Scraps</h2>
      {loading ? (
        <p>Loading...</p>
      ) : uid ? (
        scraps.length === 0 ? (
          <p>No scraps uploaded yet.</p>
        ) : (
          <ul>
            {scraps.map((scrap) => (
              <li key={scrap.id}>{scrap.title}</li>
            ))}
          </ul>
        )
      ) : (
        <p>Please log in to view your scraps.</p>
      )}
    </div>
  );
};

export default MyScrapsPage;
