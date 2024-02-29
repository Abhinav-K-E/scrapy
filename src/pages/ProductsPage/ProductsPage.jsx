import React, { useEffect, useState } from 'react';
import './ProductPage.scss';
import TopNav from '../../components/Dashboard-component/TopNav/TopNav';
import Card from '../../components/Card/Card';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';
import fetchAxios from '../../fetchAxios/fetchAxios';

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(false);
  const[search,setSearch]=useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAxios.get(
        '/market/.*'
      );
      setProducts(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className='products-page'>
      <TopNav search={search} setSearch={setSearch} setLoader={setLoader} setProducts={setProducts} products={products} />
      <div className='product-cards'>
      {loader && (
        <div className='lod-contain'>
          <Triangle
            visible={true}
            height='80'
            width='80'
            color='#131736'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      )}
      {
        (products?.length==0)&&(
          <p>No result is found !</p>
        )
      }
        {products?.map((item,index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
