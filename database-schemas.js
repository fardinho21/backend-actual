const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: String
});

const dataBaseSchemas = {UserSchema}

module.exports = {dataBaseSchemas}