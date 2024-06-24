import React from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './component/layout/Header'
import Home from './component/Home'
import Footer from './component/layout/Footer'
import ProductDetails from './component/product/ProductDetails'
import Cart from './component/cart/Cart'
import Login from './component/user/Login'
import Registration from './component/user/Registration'
import Profile from './component/user/Profile'
import Dashboard from './component/admin/Dashboard'
import Contact from './component/Contact'
import Checkout from './component/checkout/Checkout'
import PasswordUpdate from './component/user/PasswordUpdate'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="productDetails/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/updatePassword" element={<PasswordUpdate/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App