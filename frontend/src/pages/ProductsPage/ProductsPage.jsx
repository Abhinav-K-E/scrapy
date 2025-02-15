import React, { useEffect, useState } from "react";
import "./ProductPage.scss";
import TopNav from "../../components/Dashboard-component/TopNav/TopNav";
import Card from "../../components/Card/Card";
import { Triangle } from "react-loader-spinner";

import SCRAP from "../../assets/scrap.svg";
import { Link } from "react-router-dom";
import { fetchAllData } from "../../utils/getAllScraps";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllData();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="products-page">
      <TopNav
        search={search}
        setSearch={setSearch}
        setLoader={setLoader}
        setProducts={setProducts}
        products={products}
      />

      <div className="banner-container">
        <div className="banner">
          <div className="banner-left">
            <div className="banner-txt">
              Turn your trash into <br></br> treasure with Scrapify!
            </div>
            <Link to="/dashboard/scrapify" className="banner-btn">
              Scrapify
            </Link>
          </div>
          <div className="banner-right">
            <img className="scrap-img" src={SCRAP} alt="" />
          </div>
        </div>
      </div>

      <div className="product-cards">
        {loader && (
          <div className="lod-contain">
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#131736"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {products?.length == 0 && <p>No result is found !</p>}
        {products?.map((item, index) => (
          <Card key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
