const stripe = require('stripe')('sk_test_51M0qRCDXPJlr8jYiuJSnkv6EGDgxcfYAVrjpCQwbALQGBW0Nm8DGI8YAO8RyFRB3nVWtgzR4HJ5o2eNeEvH7Ec9Y00tabnrPFs')
const mongoose = require("mongoose");
const { dataBaseSchemas } = require('../db-schemas/database-schemas');
mongoose.connect("mongodb://localhost:27017/local");

const customerModel = mongoose.model("customerData", dataBaseSchemas.CustomerSchema);
const paymentCardModel = mongoose.model("paymentCardData", dataBaseSchemas.PaymentCardSchema);
const TEST_CARD = "4242424242424242";


//TODO - Implement checkout session API endpoint and Unit Test it.
const initiateCheckoutSession = (app) =>
{
    console.log("INITIATE_CHECKOUT_SESSION API ENDPOINT CALLED")
    // The request should contain a list of products chosen by the user
    app.post("/stripe-feature-service/create-checkout-session/", async (req, res) => 
    {
        // console.log(req.body)
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.line_items,
            customer: req.body.customerID,
            mode: "subscription",
            success_url: "https://www.google.com",
            cancel_url: "https://bing.com"
        })
        .then(result => {
            console.log("Checkout Result: ", result)
            res.status(200).json(result);
        })
        .catch(error => 
        {
            console.log("Error Checkout Failed: ", error);
            res.status(500).json(error);
        })
    })
}

const checkoutComplete = (req, res) =>
{
    res.status(200).json("Checkout Complete!");
}

const createCustomer = async (app) =>
{
    await app.post("/stripe-feature-service/create-customer/", (req, res) => 
    {
        const customer = stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            description: "new"
        }).then(result => 
        {
            console.log("STRIPE_FEATURE Service Creatd Customer Customer: ", result.id)
            res.locals.customerID = result.id
            res.status(200);
        }).catch(error => 
        {
            console.log(error)
            res.status(500).json(error)
        })

    })
}

const createPaymentRequest = (app) =>
{
    app.post("/stripe-feature-service/create-payment-request/", (req, res) =>
    {
        const paymentRequest = stripe.paymentRequest({/*TODO fillout request*/});
    })
}

// TODO - add payment card details to stripe-curl-command.txt for the corresponding curl command
// TODO - investigate if stripe.createToken is needed for this endpoint
// TODO - create the card and add it to the customer 
const createPaymentCardForExistingCustomer = (app) =>
{
    app.post("/stripe-feature-service/create-payment-card/", (req, res, next) => 
    {
        console.log(req.body.customerID)
        stripe.customers.retrieve(req.body.customerID)
        .then(customer => 
        {
            // stripe.customers.createSource(req.body.customerID, {source: })
            console.log(customer)
            res.status(200).json("Hello World")
        }).catch(error => 
        {
            res.status(500).json(error)
        })
    })
}

const stripeFeatureService = {
    initiateCheckoutSession, 
    createCustomer,
    createPaymentRequest, 
    createPaymentCardForExistingCustomer
}

module.exports = {stripeFeatureService}