const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const {jwtHelper} = require("./jwt-service.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// DATA BASE SCHEMAS AND MODELS
const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: Date
});

const userModel = mongoose.model("users", UserSchema);


// SANITIZERS AND VALIDATORS
var sanitizeHeaderPayload = [check('header', "Header must be an object.").isObject(),
                      check('payload', "Payload must be an object.").isObject()];
var sanitizeAuthorization = [check('authorization').contains]

// API END POINTS

const createUser = (app, mongoose) => {
    app.post("/create-user/", sanitizeHeaderPayload, (req, res) => {

        // sanitize the request
        const errors = validationResult(req);

        if (errors.isEmpty())
        {
            //Check for existing user in database
            res.status(200).json("Request sanitized.");

            // TOKEN GENERATION --  DO NOT DELETE
            // jwtHelper.jwtGenerateToken(req.body.header,req.body.payload)
            // .then(data => {
            //     console.log(data)
            //     res.status(200).json(data);
            // });
        }
        else
        {
            console.log(errors);
            res.status(500).json("Error handling request!");
        }

    });
};

const logInUser = (app, mongoose) => {
    app.post("/login-user/", sanitizeAuthorization, (req, res) => {
        
        // sanitize the request
        const errors = validationResult(req);
        
        if (errors.isEmpty())
        {
            // check existing data element in database

            // TOKEN AUTHENTICATION --  DO NOT DELETE
            // jwtHelper.jwtAuthenticateToken(req.body.authorization)
            // .then(authentic => {
                //     if (!authentic)
                //     {
                    //         res.status(403).json("Not Authentic")
                    //     }
            //     else 
            //     {
            //         res.status(200).json("Authentication Success")
            //     }
            // });
        }
        else
        {
            console.log(errors);
            res.status(500).json("Error handling request!");
        }

    });
};

const logOutUser = (app, mongoose) => {
    app.post("/logout-user/", sanitizeAuthorization, (req, res) => {
        
        // sanitize the request
        const error = validationResult(req)
        
        if (error.isEmpty())
        {
            // check existing data element in database
            // jwtHelper.jwtAuthenticateToken(req.headers.authorization)
            // .then(authentic => {
            //     // if token not verified return 403 error
            //     if (!authentic)
            //     {
            //         res.status(403).json("Not Authentic")
            //     }
            //     else 
            //     {
                //         res.status(200).json("Authentication Success");
            //     }
            //     // if token is verified logOut the user 
            // });
        }
        else
        {   
            console.log(errors);
            res.status(500).json("Error handling request!");
        }

    });
};

module.exports = {createUser, logInUser, logOutUser};