import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
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
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/actions/UserAction'
import Shipping from './component/cart/Shipping'
import ConfirmOrder from './component/cart/ConfirmOrder'
import Payment from './component/payment/Payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from './component/payment/Success'
import MyOrder from './component/order/MyOrder'
import OrderDetails from './component/order/OrderDetails'
import ProtectedRoute from './component/protectedRoute/ProtectedRoute'

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  //console.log(stripeApiKey)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
    getStripeApiKey()
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
        <Route path="/contact" element={<Contact />} />

        {/* Secure */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders/me" element={<MyOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        {
          stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )
        }


      </Routes>
      <Footer />
    </>
  )
}

export default App