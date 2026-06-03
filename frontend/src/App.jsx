import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Products from './components/Products';
import Cart from './components/Cart';
import Registration from './components/Registration';
import Login from './components/Login';
import CardPayment from './components/CardPayment';
import UPIPayment from './components/UPIPayment';
import CODPayment from './components/CODPayment';
import Profile from './components/Profile';
import Orders from './components/Orders';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <div className="main-content">
                <Hero />
              </div>
              <Footer />
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/registration" element={
            <>
            <Header/>
            <Registration />
            <Footer/>
            </>
          } />
          <Route path="/login" element={
            <>
            <Header />
            <Login />
            <Footer />
            </>
          } />
            
          <Route path="/card-payment" element={<CardPayment />} />
          <Route path="/upi-payment" element={<UPIPayment />} />
          <Route path="/cod-payment" element={<CODPayment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;