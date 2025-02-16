import React, { useEffect, useState } from "react";
import "./AdminScrapManagment.scss";
import { fetchAllData } from "../../utils/getAllScraps";
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

const AdminScrapManagment = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllData();
      setProducts(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== productId));
      deleteDocument("scraps", productId);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Scrap Database</h1>
      </header>

      <main className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.estimatedValue}
            onDelete={handleDelete}
          />
        ))}
      </main>
    </div>
  );
};

export default AdminScrapManagment;
