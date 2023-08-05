const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: Date
});

const MTGCardSchema = mongoose.Schema({
    cardName: String,
    setCode: String,
    imageUrl: String
})

const MTGSetSchema = mongoose.Schema({
    setName: String,
    setCode: String,
})

const MTGSetWithCardsSchema = mongoose.Schema({
    setCode: String,
    cardList: [String],
})

const dataBaseSchemas = {UserSchema, MTGSetSchema, MTGCardSchema, MTGSetWithCardsSchema}

module.exports = {dataBaseSchemas}