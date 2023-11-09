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

const MTGCardSchema = mongoose.Schema({
    cardName: String,
    setCode: String,
    imageUrl: String
})

const MTGSetSchema = mongoose.Schema({
    setName: String,
    setCode: String,
})

const MTGSetCodeWithCardsSchema = mongoose.Schema({
    setCode: String,
    cardList: [String],
})

const MTGProductSchema = mongoose.Schema({
    productName: String,
    cardList: [MTGCardSchema]
})

const dataBaseSchemas = {
    UserSchema, 
    CustomerSchema,
    PaymentCardSchema,
    MTGSetSchema, 
    MTGCardSchema, 
    MTGSetCodeWithCardsSchema, 
    MTGProductSchema
}

module.exports = {dataBaseSchemas}