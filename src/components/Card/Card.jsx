import React from 'react';
import './Card.scss'
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  console.log(item.imgid)
  return (
    <Link to={`/dashboard/products/${item.imgid}`} className='product-card'>
      <div
        className='product-top'
        style={{
          background: `url(https://scrapy-api-qbtq.onrender.com/image/${item?.imgid})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat'
        }}
      >
        <div className='location-icon'>
          <svg
            width={18}
            height={18}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9 10.627A2.898 2.898 0 119 4.83a2.898 2.898 0 110 5.797zm0-4.672c-.975 0-1.777.795-1.777 1.778A1.776 1.776 0 109 5.955z'
              fill=''
            />
            <path
              d='M9 17.07c-1.11 0-2.227-.42-3.097-1.252-2.213-2.13-4.658-5.528-3.735-9.57C3 2.58 6.203.938 9 .938h.008c2.797 0 6 1.642 6.832 5.317.915 4.042-1.53 7.433-3.742 9.563A4.478 4.478 0 019 17.07zM9 2.062c-2.182 0-4.987 1.163-5.73 4.433-.81 3.532 1.41 6.577 3.42 8.505a3.32 3.32 0 004.628 0c2.002-1.928 4.222-4.973 3.427-8.505-.75-3.27-3.563-4.433-5.745-4.433z'
              fill=''
            />
          </svg>
          {item?.location}
        </div>
      </div>
      <div className='product-bottom'>
        <div className='p-top'>{item?.title}</div>
        <div className='p-bottom'>
          <div className='p-price'>
            <div className='rupee'>₹</div>
            {item?.price}
          </div>
          <div className='buy-btn'>Buy Now</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
