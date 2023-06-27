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
const sanitizeToken = check('authentication').matches(/(([A-Za-z0-9_-]+).){2}([A-Za-z0-9_-]+)/)
const sanitizeAuthentication = [check("authentication", "Invalid token format.").contains(".", {minOccurrences:2}), sanitizeToken]

const sanitizeUserRequest = [check('username').isLength({max:25,min:6}), check('password').isLength({max:15,min:6}), ...sanitizeHeaderPayload]


// API END POINTS
const createUserRequest = (app, mongoose) => {
    app.post("/create-user-request/", sanitizeUserRequest, (req, res, next) => {
        // sanitize the request
        const result = validationResult(req);

        if (result.isEmpty())
        {
            //Check for existing user in database
            userModel.exists({userName:req.body.username})
            .then(data => {
                console.log(data == null)
                if (data == null) 
                {
                    next()
                }
                else
                {
                    res.status(500).json("Error handling request - Username taken");
                }
            }, err => {
                console.log(err)
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
    app.post("/login-user-request/", sanitizeUserRequest, (req, res, next) => {
        
        // sanitize the request
        const result = validationResult(req);
        
        if (result.isEmpty())
        {
            // check existing data element in database
            userModel.find({userName:req.body.username})
            .then(data => {
                if (data.length == 0)
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
            jwtHelper.jwtGenerateToken(req.body.header, req.body.payload)
            .then(token => {
                userModel.updateOne({userName: req.body.username}, {authentication:token.token, expires: token.expires})
                .then(data => {
                    console.log(data)
                    res.status(200).json({authentication: token})
                }, err => {
                    console.log(err)
                    res.status(500).json("Login Failed - Server error")
                })
            })
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
    app.post("/logout-user-request/", sanitizeAuthentication, (req, res, next) => {
        
        // sanitize the request
        const error = validationResult(req)
        
        if (error.isEmpty())
        {
            // check existing data element in database
            userModel.find({userName:req.body.username})
            .then(data => {
                if (data.length == 0) {
                    res.status(500).json("Error handling request - Username does not exist");
                }
                else {
                    req.body.hash = data[0].passwordHash
                    next()
                }
            }, err => {
                console.log(err)
                res.status(500).json("Error handling request - Database error")
            })
        }
        else
        {   
            console.log(error);
            res.status(500).json("Error handling request: " + result.error[0].path + " invalid");            
        }

    }, logOutUser);
};

const logOutUser = (req, res) => {
    bcryptHelper.comparePassAndHash(req.body.password, req.body.hash)
    .then(result=> {
        if (result)
        {
            //TODO: Respond with token
            jwtHelper.jwtAuthenticateToken(req.body.authentication)
            .then(authenticity => {

                if (authenticity)
                {
                    userModel.updateOne({ userName: req.body.username }, { authentication: "invalid", expires: "" })
                    .then(data => {
                        console.log(data)
                        res.status(200).json("Logged out")
                    }, err => {
                        console.log(err)
                        res.status(500).json("Login Failed - Server error")
                    })
                }
                else
                {
                    res.status(403).json("Error handling request - invalid token");
                }

            }, err => {
                console.log(err)
                res.status(500).json("Error handling request - Server Error!");
            })
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

module.exports = {createUserRequest, logInUserRequest, logOutUserRequest};