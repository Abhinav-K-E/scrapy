import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

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

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/products" element={<ProductPage />} />
            <Route path="/dashboard/scrapify" element={<ScrapifyPage />} />
            <Route path="/dashboard/database" element={<DatabasePage />} />
            <Route path="/dashboard/shedule" element={<MyScrapsPage />} />
            <Route
              path="/dashboard/products/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/dashboard/users" element={<UsersPage />} />
            <Route path="/dashboard/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
