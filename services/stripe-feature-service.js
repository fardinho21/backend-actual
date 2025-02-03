const stripe = require('stripe')('sk_test_51M0qRCDXPJlr8jYiuJSnkv6EGDgxcfYAVrjpCQwbALQGBW0Nm8DGI8YAO8RyFRB3nVWtgzR4HJ5o2eNeEvH7Ec9Y00tabnrPFs')
const mongoose = require("mongoose");
const { dataBaseSchemas } = require('../db-schemas/database-schemas');
mongoose.connect("mongodb://localhost:27017/local");

const customerModel = mongoose.model("customerData", dataBaseSchemas.CustomerSchema);
const paymentCardModel = mongoose.model("paymentCardData", dataBaseSchemas.PaymentCardSchema);
const TEST_CARD = "4242424242424242";


//TODO - Implement checkout session API endpoint and Unit Test it.
const initiateCheckoutSessionSub = (app) => {
    console.log("INITIATE_CHECKOUT_SESSION API ENDPOINT CALLED")
    // The request should contain a list of products chosen by the user
    app.post("/stripe-feature-service/create-checkout-session/", async (req, res) => {
        // console.log(req.body)
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.line_items,
            customer: req.body.customerID,
            mode: "subscription",
            success_url: "http://localhost:3000/checkout-complete",
            cancel_url: "http://localhost:3000/cancel-checkout"
        })
            .then(result => {
                console.log("Checkout Result: ", result)
                res.status(200).json(result);
            })
            .catch(error => {
                console.log("Error Checkout Failed: ", error);
                res.status(500).json(error);
            })
    })
}

const createCustomer = async (app) => {
    await app.post("/stripe-feature-service/create-customer/", async (req, res) => {

        // console.log("CREATE_STRIPE_CUSTOMER: ",req.body)
        // res.status(200).json("Test")
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            description: "new"
        }).then(result => {
            console.log("STRIPE_FEATURE_SERVICE: Created Customer: ", result.id)
            res.locals.customerID = result.id
            res.status(200).json({ "id": result.id });
        }).catch(error => {
            console.log(error)
            res.status(500).json(error)
        })

    })
}



const stripeFeatureService = {
    initiateCheckoutSessionSub,
    createCustomer,
    createPaymentIntent,
}

module.exports = { stripeFeatureService }