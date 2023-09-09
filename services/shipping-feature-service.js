const mongoose = require("mongoose");
const {dataBaseSchemas} = require("../db-schemas/database-schemas.js");
mongoose.connect("mongodb://localhost:27017/local");

const createShippingLabel = (app) =>
{

}

const validateAddress = (app) =>
{

}

const trackPackage = (app) =>
{

}

const calculateCostAndTax = (app) =>
{

}

const shippingFeatureService = {createShippingLabel, calculateCostAndTax, trackPackage, validateAddress};
module.exports = {shippingFeatureService};