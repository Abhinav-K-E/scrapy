import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item, index }) => {
  return (
    <Link to={`/dashboard/products/${index}`} className="product-card">
      <img src={item?.imageUrl} className="product-top"></img>
      <div className="location-icon">{item?.location}</div>
      <div className="product-bottom">
        <div className="p-top">{item?.title}</div>
        <div className="p-bottom">
          <div className="p-price">
            <div className="rupee">₹</div>
            {item?.estimatedValue}
          </div>
          <div className="buy-btn">Buy Now</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
