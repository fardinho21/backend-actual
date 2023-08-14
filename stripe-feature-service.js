const stripe = require('stripe')('pk_test_51M0qRCDXPJlr8jYiVDeeC3uxrYeRjLFZxMIWd7N9VLutTtIyzKIBtVy0I6K5KesiSQYMIKBASmgCBCf92ZUUpAzz00jiuU98pa')

const checkoutSession = (app) =>
{
    // The request should contain a list of products chosen by the user
    app.post("", (req, res) => 
    {
        const session = stripe.checkout.sessions.create({

        })
    });
}

const createProduct = (app) =>
{
    app.post("", (req, res) =>
    {
        
    })
    
}

const createPaymentRequest = (app) =>
{
    app.post("", (req, res) =>
    {
        const paymentRequest = stripe.paymentRequest({/*TODO fillout request*/});
    })
}


const stripeFeatureService = {checkoutSession, createProduct, createPaymentRequest}

module.exports = {stripeFeatureService}