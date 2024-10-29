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
    // The request should contain a list of products chosen by the user
    app.post("/stripe-feature-service/create-checkout-session/", async (req, res, next) => 
    {
        const session = await stripe.checkout.sessions.create({
            //TODO: refer to docs about creating and using checkout sessions
            // customer: <customer_id>
            // line_items: [{price: <price_-code>}]
            // mode: 'payment
            // expires_at: <seconds>
            //

            line_items: [{price: req.body.price, quantity: req.body.quantity}],
            customer: req.body.customerID,
            mode: "payment",
            success_url: ``,
            cancel_url: ``
        })
        .then(result => {
            console.log("Checkout Result: ", result)
            next();
        })
        .catch(error => 
        {
            console.log("Error Checkout Failed: ", error);
        })
    }, checkoutComplete);
}

const checkoutComplete = (req, res) =>
{
    res.status(200).json("Checkout Complete!");
}

const createCustomer = (app) =>
{
    app.post("/stripe-feature-service/create-customer/", (req, res, next) => 
    {
        const customer = stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            description: "new"
        }).then(result => 
        {
            console.log("Customer: ", result.id)
            res.locals.customerID = result.id
            next();
        }).catch(error => 
        {
            console.log(error)
            res.status(500).json(error)
        })

    })
}

const storeNewCustomerData = (app) =>
{
    app.post("/stripe-feature-service/create-customer/", (req, res) => {
        console.log("storeNewCustomerData into mongoDB", res.locals.customerID)
        customerModel.insertMany({customerID: res.locals.customerID, customerName: "", address: "", email: ""})
        .then(data => 
        {
            console.log(data)
            res.status(200).json({
                customerID: res.locals.customerID, 
                mongoDB: data[0]._id
            })
        }).catch(error =>
        {
            console.log(error)
            res.status(500).json(error)
        });
    })
}

const createProduct = (app) =>
{
    app.post("/stripe-feature-service/create-product/", (req, res) =>
    {
        // TODO: convert list of product ids into metadata key-value pairs
        // attention: cardList in the request body contains a list of product IDs. This list should be converted into a Stripe product metadata attribute, holding keys as cardX and values as product IDs to a specific card

        var meta = req.body.cardList //cardName : quantity
        const product = stripe.products.create({
            name: req.body.productName,
            metadata: meta
        }).then(result => {
            console.log("Product: ", result)
            res.status(200).json(result)
        }).catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
    })
}

const updateProduct = (app) => 
{
    app.post("/stripe-feature-service/update-product/", (req, res) =>
    {
        const product = stripe.products.update({
            // TODO: use req to fill in product name and metadata
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
    storeNewCustomerData,
    createCustomer, 
    createProduct, 
    updateProduct,
    createPaymentRequest, 
    createPaymentCardForExistingCustomer
}

module.exports = {stripeFeatureService}