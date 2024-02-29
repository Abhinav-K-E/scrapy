import React from 'react'
import './ProductDetailPage.scss'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
    const params = useParams();
    console.log(params.id);
  return (
    <div className='product-detail-page'>
        
    </div>
  )
}

export default ProductDetailPage