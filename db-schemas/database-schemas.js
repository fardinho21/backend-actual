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

const ArpeggioUserInputTable = mongoose.Schema({
    inputString: String,
    supported: Boolean
})

const dataBaseSchemas = {
    UserSchema, 
    CustomerSchema,
    PaymentCardSchema,
    ArpeggioUserInputTable
}

module.exports = {dataBaseSchemas}