import './App.css'
import React, { useEffect } from 'react'
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
import { useDispatch } from 'react-redux'
import { loadUser } from './redux/actions/UserAction'
import Shipping from './component/cart/Shipping'
import CheckoutStep from './component/cart/CheckoutStep'
import ConfirmOrder from './component/cart/ConfirmOrder'
import Payment from './component/payment/Payment'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkoutStep" element={<CheckoutStep/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/order/confirm" element={<ConfirmOrder/>} />
        <Route path="/payment" element={<Payment/>} />

      </Routes>
      <Footer />
    </>
  )
}

export default App