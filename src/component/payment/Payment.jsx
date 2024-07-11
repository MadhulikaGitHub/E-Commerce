import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useState } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutStep from '../cart/CheckoutStep';
import './Payment.css'
import { useNavigate } from 'react-router-dom';

const options = {
  style: {
    base: {
      frontSize: "16px"
    },
    invalid: {
      color: "#9e2146"
    }
  }
}

function Payment() {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  // const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.itemsPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <CheckoutStep shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>
            <button
              id="pay_btn"
              type="submit"
              onClick={submitHandler}
              className="btn btn-block py-3"
            >
              Pay
            </button>

          </form>
        </div>
      </div>

    </>
  )
}

export default Payment