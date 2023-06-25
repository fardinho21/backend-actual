const { check, body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const {jwtHelper} = require("./jwt-service.js");

const {bcryptHelper} = require("./bcrypt-service.js");


// DATA BASE SCHEMAS AND MODELS
mongoose.connect("mongodb://localhost:27017/local");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String,
    authentication: String,
    expires: String
});

const userModel = mongoose.model("users", UserSchema);


// SANITIZERS AND VALIDATORS
const sanitizeHeaderPayload = [check('header', "Header must be an object.").isObject(),
                      check('payload', "Payload must be an object.").isObject()];
const sanitizeToken = check('authorization').matches(/(([A-Za-z0-9_-]+).){2}([A-Za-z0-9_-]+)/)
const sanitizeAuthorization = [check("authorization", "Invalid token format.").contains(".", {minOccurrences:2}), sanitizeToken]

const sanitizeCreateUserRequest = [check('username').isLength({max:25,min:6}), check('password').isLength({max:15,min:6})]

// API END POINTS

const createUserRequest = (app, mongoose) => {
    app.post("/create-user-request/", sanitizeCreateUserRequest, (req, res, next) => {

        // sanitize the request
        const result = validationResult(req);

        if (result.isEmpty())
        {
            //Check for existing user in database
            userModel.exists({userName:req.body.username})
            .then(dcmnt => {dcmnt == null ? next() : res.status(500).json("Error handling request - Username taken")}, 
                  err => {res.status(500).json("Error handling request")});
        }
        else
        {
            console.log(result)
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid")
        }

    }, createUser)
};

// TODO: 
// TODO: Do not response with a token. Respond with a success message.
const createUser = (req, res, next) => {
    var tempPayload = req.body.payload;
    tempPayload.userName = req.body.username;
    bcryptHelper.generatePassHash(req.body.password)
    .then(hash =>{
        tempPayload.passwordHash = hash;

        userModel.insertMany({userName:tempPayload.userName, passwordHash: hash, authentication: "invalid", expires:""})
        .then(data => {
            console.log(data);
            res.status(200).json("User created!");
        }, err => {
            console.log(err)
            res.status(500).json("Error handling request - Database error")  
        });            
     }, err => {
        console.log(err)
        res.status(500).json("Error handling request - Server Error") 
     });
    
};

const logInUserRequest = (app, mongoose) => {
    app.post("/login-user-request/", sanitizeAuthorization, (req, res, next) => {
        
        // sanitize the request
        const result = validationResult(req);
        
        if (result.isEmpty())
        {
            // check existing data element in database
            userModel.exists({userName:req.body.username})
            .then(dcmnt => {dcmnt == null ? res.status(500).json("Error handling request - Username does not exist") : next() }, 
                  err => {res.status(500).json("Error handling request - Database error")});
        }
        else
        {
            console.log(result);
            res.status(500).json("Error handling request - Validation error");
        }

    }, logInUser);
};

const logInUser = (req, res) => {
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
};

const logOutUserRequest = (app, mongoose) => {
    app.post("/logout-user-request/", sanitizeAuthorization, (req, res, next) => {
        
        // sanitize the request
        const error = validationResult(req)
        
        if (error.isEmpty())
        {
            // check existing data element in database
            userModel.exists({userName:req.body.username})
            .then(dcmnt => {dcmnt == null ? res.status(500).json("Error handling request - Username does not exist") : next()}, 
                  err => {res.status(500).json("Error handling request")});
        }
        else
        {   
            console.log(errors);
            res.status(500).json("Error handling request!");
        }

    }, logOutUser);
};

const logOutUser = (req, res) => {
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
};

module.exports = {createUserRequest, logInUserRequest, logOutUserRequest};