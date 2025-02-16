import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// authprovider
import { AuthProvider, useAuth } from "./context/AuthContext";

//routes
import Home from "./pages/Home/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductPage from "./pages/ProductsPage/ProductsPage";
import ScrapifyPage from "./pages/ScrapifyPage/ScrapifyPage";
import DatabasePage from "./pages/DatabasePage/DatabasePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import MyScrapsPage from "./pages/MyScrapsPage/MyScrapsPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ChatPage from "./pages/chatPage/ChatPage";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminScrapManagment from "./pages/AdminScrapManagment/AdminScrapManagment";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = localStorage.getItem("isAdmin");
    console.log(checkAdmin);
    if (checkAdmin == "true") {
      navigate("/admin/users");
    }
  }, []);
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/database" element={<AdminScrapManagment />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/products" element={<ProductPage />} />
            <Route path="/dashboard/scrapify" element={<ScrapifyPage />} />
            <Route path="/dashboard/database" element={<DatabasePage />} />
            <Route path="/dashboard/shedule" element={<MyScrapsPage />} />
            <Route
              path="/dashboard/products/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/dashboard/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
