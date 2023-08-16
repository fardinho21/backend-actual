const stripe = require('stripe')('sk_test_51M0qRCDXPJlr8jYiuJSnkv6EGDgxcfYAVrjpCQwbALQGBW0Nm8DGI8YAO8RyFRB3nVWtgzR4HJ5o2eNeEvH7Ec9Y00tabnrPFs')

const createProduct = (mtgCardObject) =>
{
    stripe.products.create({
        name: mtgCardObject.cardName,
        metadata: 
        {
            cardName: mtgCardObject.cardName, 
            setCode: mtgCardObject.setCode, 
            imageUrl: mtgCardObject.imageUrl
        }
    }).then(result => {console.log(result)})
}

const updateProduct = () => 
{

}

const stripeScript = {createProduct, updateProduct}
module.exports = {stripeScript}