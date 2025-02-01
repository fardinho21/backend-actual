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

  const [pageIndex, setPageIndex] = useState(Pages.PRODUCTS_PAGE_INDEX);

  const query = new URLSearchParams(window.location.search)

  if (query.get("checkout-complete")) {
    setPageIndex(Pages.COMPLETE_PAGE_INDEX)

  }
  if (query.get("cancel-checkout")) {
    setPageIndex(Pages.CANCEL_PAGE_INDEX)
  }

  const productThatWasSelectedEventHandler = (event) => {
    console.log(event.target.innerText.split(":")[1].trim())
  }

  return (
    <div className="App">

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

  );
}

