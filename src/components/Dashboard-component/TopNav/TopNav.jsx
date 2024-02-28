import React from 'react';
import './TopNav.scss';

const TopNav = () => {
  return (
    <div className='dash-top-nav'>
      <div className='dash-top-left'>
        <div className="search-bar">

        </div>
      </div>
      <div className='dash-top-right'>
        <div className="profile">
            <div className="profile-pic">

            </div>
            <div className="profile-name">
                John
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
