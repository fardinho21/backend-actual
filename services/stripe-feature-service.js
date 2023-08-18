const stripe = require('stripe')('sk_test_51M0qRCDXPJlr8jYiuJSnkv6EGDgxcfYAVrjpCQwbALQGBW0Nm8DGI8YAO8RyFRB3nVWtgzR4HJ5o2eNeEvH7Ec9Y00tabnrPFs')

const checkoutSession = (app) =>
{
    // The request should contain a list of products chosen by the user
    app.post("/stripe-feature-service/create-checkout-session/", (req, res) => 
    {
        const session = stripe.checkout.sessions.create({
            //TODO: refer to docs about creating and using checkout sessions
        })
    });
}

const createCustomer = (app) =>
{
    app.post("/stripe-feature-service/create-customer/", (req, res) => 
    {
        const customer = stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        }).then(result => 
        {
            console.log("Customer:", customer.id)
            res.status(200).json(result)
        }).catch(error => 
        {
            console.log(error)
            res.status(500).json(error)
        })

    })
}

const createProduct = (app) =>
{
    app.post("/stripe-feature-service/create-product/", (req, res) =>
    {
        const product = stripe.products.create({
            // TODO: use req to fill in product name and metadata
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

const createPaymentCard = (app) =>
{
    app.post("/stripe-feature-service/create-payment-card/", (req, res) => 
    {

    })
}


const stripeFeatureService = {checkoutSession, createCustomer, createProduct, updateProduct,createPaymentRequest, createPaymentCard}

module.exports = {stripeFeatureService}