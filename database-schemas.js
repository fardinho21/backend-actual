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

const dataBaseSchemas = {UserSchema}

module.exports = {dataBaseSchemas}