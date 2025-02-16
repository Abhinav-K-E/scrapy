import React, { useState, useEffect } from "react";
import "./MyScrapsPage.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import deleteDocument from "../../utils/deleteDoc";

const ProductCard = ({ id, image, title, description, price, onDelete }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={image || "/api/placeholder/300/200"}
          alt={title}
          className="product-image"
        />
        <button
          onClick={() => onDelete(id)}
          className="delete-button"
          aria-label="Delete item"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>

      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        {/* <p className="product-description">{description}</p> */}
        <div className="price-container">
          <span className="product-price">${price}</span>
        </div>
      </div>
    </div>
  );
};

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

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setScraps(scraps.filter((product) => product.id !== productId));
      deleteDocument("scraps", productId);
    }
  };

  return (
    <div className="my-scraps-page">
      <h2>My Scraps</h2>
      {loading ? (
        <p>Loading...</p>
      ) : uid ? (
        scraps.length === 0 ? (
          <p>No scraps uploaded yet.</p>
        ) : (
          <div className="scraps">
            {scraps.map((scrap) => (
              <ProductCard
                key={scrap.id}
                id={scrap.id}
                image={scrap.imageUrl}
                title={scrap.title}
                description={scrap.description}
                price={scrap.estimatedValue}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )
      ) : (
        <p>Please log in to view your scraps.</p>
      )}
    </div>
  );
};

export default MyScrapsPage;
