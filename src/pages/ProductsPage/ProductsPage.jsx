import React, { useEffect, useState } from 'react';
import './ProductPage.scss';
import TopNav from '../../components/Dashboard-component/TopNav/TopNav';
import Card from '../../components/Card/Card';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'https://scrapy-api-qbtq.onrender.com/market/products'
      );
      setProducts(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className='products-page'>
      <TopNav />
      <div className='product-cards'>
        {products?.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
