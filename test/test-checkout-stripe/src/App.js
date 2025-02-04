import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import CheckoutForm from "./CheckoutForm"
import CompletePage from "./CompletePage"
import ProductsPage from './ProductsPage'
import CancelPage from './CancelPage'

const stripePromise = loadStripe("pk_test_51M0qRCDXPJlr8jYiVDeeC3uxrYeRjLFZxMIWd7N9VLutTtIyzKIBtVy0I6K5KesiSQYMIKBASmgCBCf92ZUUpAzz00jiuU98pa")

const Pages =
{
  PRODUCTS_PAGE_INDEX: 0,
  COMPLETE_PAGE_INDEX: 1,
  CANCEL_PAGE_INDEX: 2
}

export default function App() {

  useEffect(() => {
    // console.log(cartContents)
  })

  const [pageIndex, setPageIndex] = useState(Pages.PRODUCTS_PAGE_INDEX);
  const [displayCart, toggleCartDisplay] = useState(false);
  const [cartContents, setCartState] = useState([]);


  const query = new URLSearchParams(window.location.search)
  if (query.get("checkout-complete")) {
    setPageIndex(Pages.COMPLETE_PAGE_INDEX)
  }
  if (query.get("cancel-checkout")) {
    setPageIndex(Pages.CANCEL_PAGE_INDEX)
  }

  const productThatWasSelectedEventHandler = (event) => {
    // console.log(event.target)
    var product_name = event.target.innerText.split(":")[0].trim()
    var t = event.target.innerText.split(":")[1].trim().split("$")[1].split(".")
    var product_price = t[0] + t[1]

    var cart_items = cartContents.slice()
    cart_items.push({ "product_name": product_name, "product_price": product_price })
    setCartState(cart_items)
  }

  const onCartButtonClick = (event) => {
    if (displayCart) {
      toggleCartDisplay(false);
    }
    else {
      toggleCartDisplay(true);
    }
  }

  const onClearCartButtonClick = (event) => {
    setCartState([])
  }
  const onAddCartItem = (event) => {

  }
  const onCheckoutButtonClick = (event) => {
    console.log("checkout button clicked -- this should navigate the app to the checkout page")
  }

  return (
    <div className="App">


      <div className="main">

        <div className="topBar">
          <button onClick={onCartButtonClick}>|||</button>
        </div>

        <div className="contents">
          {pageIndex == Pages.PRODUCTS_PAGE_INDEX &&
            <ProductsPage selectedProduct={productThatWasSelectedEventHandler}></ProductsPage>
          }
          {pageIndex == Pages.COMPLETE_PAGE_INDEX &&
            <CompletePage></CompletePage>
          }
          {pageIndex == Pages.CANCEL_PAGE_INDEX &&
            <CancelPage></CancelPage>
          }
        </div>

      </div>


      <div className="shoppingCart" style={displayCart ? { width: "30%" } : { display: "none" }}>
        <h3>
          Cart
        </h3>

        <div className="cartContents">
          <ul>
            {cartContents.map((cartItem, id) => { return <li>{cartItem.product_name} : {(cartItem.product_price / 100).toLocaleString("en-US", { style: 'currency', currency: "USD" })}</li> })}
          </ul>
        </div>
        <div className="shoppingCartControls">
          <button id="checkoutButton" onClick={onCheckoutButtonClick}>
            Checkout
          </button>
          <button id="clearCartButton" onClick={onClearCartButtonClick}>
            Clear Cart
          </button>
        </div>

      </div>

    </div>

  );
}

