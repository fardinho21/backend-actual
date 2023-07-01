const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: Date
});

const dataBaseSchemas = {UserSchema}

module.exports = {dataBaseSchemas}