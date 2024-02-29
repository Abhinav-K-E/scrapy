import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// authprovider
import { AuthProvider, useAuth } from './context/AuthContext';

//routes
import Home from './pages/Home/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductPage from './pages/ProductsPage/ProductsPage';
import ScrapifyPage from './pages/ScrapifyPage/ScrapifyPage';
import ShedulePage from './pages/ShedulePage/ShedulePage';
import DatabasePage from './pages/DatabasePage/DatabasePage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
 
const App = () => {
  return (
    <AuthProvider>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard/products' element={<ProductPage />} />
            <Route path='/dashboard/srapify' element={<ScrapifyPage />} />
            <Route path='/dashboard/database' element={<DatabasePage/>}/>
            <Route path='/dashboard/shedule' element={<ShedulePage/>}/>
            <Route path='/dashboard/products/:id' element={<ProductDetailPage/>}/>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
