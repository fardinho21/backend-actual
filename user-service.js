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
            userModel.find({userName:req.body.username})
            .then(data => {
                if (data == null) 
                {
                    next()
                }
                else
                {
                    res.status(500).json("Error handling request - Username taken");
                }
            }, err => {
                res.status(500).json("Error handling request - Database error")
            })
        }
        else
        {
            console.log(result)
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid")
        }

    }, createUser)
};

const createUser = (req, res) => {
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
    app.post("/login-user-request/", sanitizeCreateUserRequest, (req, res, next) => {
        
        // sanitize the request
        const result = validationResult(req);
        
        if (result.isEmpty())
        {
            // check existing data element in database
            userModel.find({userName:req.body.username})
            .then(data => {
                if (data == null)
                {
                    res.status(500).json("Error handling request - Username does not exist")
                }
                else
                {
                    req.body.hash = data[0].passwordHash
                    next();
                }

            }, err => {
                console.log(err)
                res.status(500).json("Error handling request - Database error")
            });
        }
        else
        {
            console.log(result);
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid");
        }

    }, logInUser);
};

const logInUser = (req, res) => {
    bcryptHelper.comparePassAndHash(req.body.password, req.body.hash)
    .then(result=> {
        if (result)
        {
            //TODO: Respond with token
            res.status(200).json("User login success")
        }
        else 
        {
            res.status(403).json("Login failed - Invalid password")
        }
    }, err => {
        console.log(err);
        res.status(500).json("Error handling request - Server Error!");
    });
};

const logOutUserRequest = (app, mongoose) => {
    app.post("/logout-user-request/", sanitizeAuthorization, (req, res, next) => {
        
        // sanitize the request
        const error = validationResult(req)
        
        if (error.isEmpty())
        {
            // check existing data element in database
            userModel.find({userName:req.body.username})
            .then(data => {
                if (data == null) {
                    res.status(500).json("Error handling request - Username does not exist");
                }
                else {
                    next()
                }
            }, err => {
                res.status(500).json("Error handling request - Database error")
            })
        }
        else
        {   
            console.log(errors);
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid");            
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