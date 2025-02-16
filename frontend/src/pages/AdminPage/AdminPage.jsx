import React from "react";
import { Outlet } from "react-router-dom";
import './AdminPage.scss'
import LeftNav from "../../components/LeftNav/LeftNav";

const AdminPage = ({ childrens }) => {
  return (
    <div className="dashboard">
      <div className="left-flex">
        <LeftNav />
      </div>
      <div className="right-flex">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
