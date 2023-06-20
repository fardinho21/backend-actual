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
        jwtHelper.jwtGenerateToken(req.body.header,req.body.payload)
        .then(data => {
            console.log(data)
            res.status(200).json(data);
        });
    });
};

const logInUser = (app, mongoose) => {
    app.post("/login-user/", (req, res) => {
        jwtHelper.jwtAuthenticateToken(req.headers.authorization)
        .then(authentic => {
            if (!authentic)
            {
                res.status(403).json(authentic)
            }
            else 
            {
                res.status(200).json("Authentication Success")
            }
        });
    });
};

const logOutUser = (app, mongoose) => {

    app.get("/logout-user/", (req, res) => {
        jwtHelper.jwtAuthenticateToken(req.body.token)
        .then(data => {
            // if token not verified return 403 error
            // if token is verified logOut the user 
        });
    });
};

module.exports = {createUser, logInUser, logOutUser};