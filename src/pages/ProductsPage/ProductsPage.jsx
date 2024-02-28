import React from 'react';
import './ProductPage.scss';
import TopNav from '../../components/Dashboard-component/TopNav/TopNav';
import Card from '../../components/Card/Card';

const ProductsPage = () => {
  return (
    <div className='products-page'>
      <TopNav />
      <div className='product-cards'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
};

export default ProductsPage;
