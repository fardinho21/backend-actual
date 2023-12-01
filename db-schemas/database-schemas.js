const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: Date
});

const CustomerSchema = mongoose.Schema({
    customerName: String,
    address: String,
    email: String,
    customerID: String
})

const PaymentCardSchema = mongoose.Schema({
    cardID: String,
    customerID: String
})


const dataBaseSchemas = {
    UserSchema, 
    CustomerSchema,
    PaymentCardSchema,
}

module.exports = {dataBaseSchemas}