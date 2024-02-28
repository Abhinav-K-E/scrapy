import React from 'react';
import { Triangle } from 'react-loader-spinner';
import './Loader.scss'

const Loader = () => {
  return (
    <div className='loader'>
      <div className='lod'>
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
    </div>
  );
};

export default Loader;
