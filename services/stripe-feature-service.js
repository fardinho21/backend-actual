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
    app.post("/stripe-feature-service/create-customer/", (req, res) =>
    {
        const customer = stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })
        .then(result => {
            console.log("Customer:", customer.id)
            res.status(200).json(result)
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