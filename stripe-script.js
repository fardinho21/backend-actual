const stripe = require('stripe')('sk_test_51M0qRCDXPJlr8jYiuJSnkv6EGDgxcfYAVrjpCQwbALQGBW0Nm8DGI8YAO8RyFRB3nVWtgzR4HJ5o2eNeEvH7Ec9Y00tabnrPFs')

const createProduct = (cardObject) =>
{
    stripe.products.create({
        name: cardObject.cardName,
        metadata: 
        {
            cardName: cardObject.cardName, 
            setCode: cardObject.setCode, 
            imageUrl: cardObject.imageUrl
        }
    }).then(result => {console.log(result)})
}

const updateProduct = () => 
{

}

const stripeScript = {createProduct, updateProduct}
module.exports = {stripeScript}