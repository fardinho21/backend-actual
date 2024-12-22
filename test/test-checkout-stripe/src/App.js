import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import CheckoutForm from "./CheckoutForm"
import CompletePage from "./CompletePage"

const stripePromise = loadStripe("pk_test_51M0qRCDXPJlr8jYiVDeeC3uxrYeRjLFZxMIWd7N9VLutTtIyzKIBtVy0I6K5KesiSQYMIKBASmgCBCf92ZUUpAzz00jiuU98pa")

export default function App() {
  const [clientSecret, setClientSecret] = useState("")
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  useEffect(() => {
    console.log("CLIENT_CREATE_PAYMENT_INTENT")
    fetch("http://localhost:8080/stripe-feature-service/create-payment-intent/", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({test:"TEST_ITEM"})
    })
    .then(res => res.json())
    .then(data => {
      console.log("DATA:",data.clientSecret)
      setClientSecret(data.clientSecret)
    })
    .catch(error => console.log(error))
  }, []);

  const appearance = {
    theme: 'stripe'
  }
  
  const loader = 'auto';
  
  return (
    <>
      {checkoutComplete &&   
      <div className="App">
        <CompletePage/>
      </div>}
      {clientSecret && <div className="App">
        <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm/>
            
        </Elements>
      </div>}
      {!clientSecret && 
      <div className="App">
        Hello From App
      </div>}

    </>

  );
}

