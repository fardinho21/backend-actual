const stripe = require('stripe')('pk_test_51M0qRCDXPJlr8jYiVDeeC3uxrYeRjLFZxMIWd7N9VLutTtIyzKIBtVy0I6K5KesiSQYMIKBASmgCBCf92ZUUpAzz00jiuU98pa')

const checkoutSession = (app) =>
{
    // The request should contain a list of products chosen by the user
    app.post("", (req, res) => 
    {
        const session = stripe.checkout.sessions.create({
            //TODO: refer to docs about creating and using checkout sessions
        })
    });
}

const createCustomer = (app) =>
{
    app.post("", (req, res) =>
    {
        const customer = stripe.customers.create({
            //TODO: use req to fill out customers 
            //TODO: we need to decide what info to collect from customers
        })
    })
}

const createProduct = (app) =>
{
    app.post("", (req, res) =>
    {
        const product = stripe.products.create({
            // TODO: use req to fill in product name and metadata
        })
    })
}

const updateProduct = (app) => 
{
    app.post("", (req, res) =>
    {
        const product = stripe.products.create({
            // TODO: use req to fill in product name and metadata
        })
    })
}

const createPaymentRequest = (app) =>
{
    app.post("", (req, res) =>
    {
        const paymentRequest = stripe.paymentRequest({/*TODO fillout request*/});
    })
}


const stripeFeatureService = {checkoutSession, createCustomer, createProduct, updateProduct,createPaymentRequest}

module.exports = {stripeFeatureService}