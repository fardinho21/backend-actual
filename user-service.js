const { check, validationRequest, sanitize } = require("express-validator");
const mongoose = require("mongoose");
const {jwtHelper} = require("./jwt-service.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String
});

const userModel = mongoose.model("users", UserSchema);

const createUser = (app, mongoose) => {
    app.post("/create-user/", (req, res) => {
        jwtHelper.jwtGenerateToken(req.body.header,req.body.payload);
    });
};

const logInUser = (app, mongoose) => {
    app.get("/login-user/", (req, res) => {
        res.status(200).json("user-service::logInUser() called...");
    });
};

const logOutUser = (app, mongoose) => {
    app.get("/logout-user", () => {
        res.status(200).json("user-service::logOutUser() called...");
    });
};

module.exports = {createUser, logInUser, logOutUser};