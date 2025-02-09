const { check, body, validationResult } = require("express-validator");
const { jwtHelper } = require("./jwt-service.js");
const { bcryptHelper } = require("./bcrypt-service.js");
const { stripeFeatureService } = require("./stripe-feature-service.js");

// DATA BASE SCHEMAS AND MODELS

// SANITIZERS AND VALIDATORS
const sanitizeHeaderPayload = [
    check('header', "Header must be an object.").isObject(),
    check('payload', "Payload must be an object.").isObject()
];

const sanitizeAuthentication = [
    check("authentication", "Invalid token format.").contains(".", { minOccurrences: 2 }),
    check('authentication').matches(/(([A-Za-z0-9_-]+).){2}([A-Za-z0-9_-]+)/)
];

const sanitizeUserRequest = [
    body('payload.username').isLength({ max: 25, min: 6 }),
    body('payload.password').isLength({ max: 15, min: 6 }),
    ...sanitizeHeaderPayload
];

// API END POINTS
const createUserRequest = (app) => {
    app.post("/create-user-request/", sanitizeUserRequest, (req, res, next) => {
        // sanitize the request
        const result = validationResult(req);

        if (result.isEmpty()) {
            //Check for existing user in postgresql data-base
        }
        else {
            console.log(result)
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid")
        }

    }, createUser)
};

// Creates a user and adds it to a 
const createUser = async (req, res) => {
    var tempPayload = req.body.payload;
    tempPayload.userName = req.body.payload.username;
    await bcryptHelper.generatePassHash(req.body.payload.password)
        .then(hash => {

            // tempPayload.passwordHash = hash;
            // console.log("USER_SERVICE, adding user to database: ", hash)
            //TODO: add users to postgresql data-base


        }, err => {
            console.log(err)
            res.status(500).json("Error handling request - Server Error")
        });

};

const logInUserRequest = (app) => {
    app.post("/login-user-request/", sanitizeUserRequest, (req, res, next) => {
        // sanitize the request
        const result = validationResult(req);

        if (result.isEmpty()) {
            //TODO: check existing data element in postgresql data-base
        }
        else {
            console.log(result);
            res.status(500).json("Error handling request: " + result.errors[0].path + " invalid");
        }

    }, logInUser);
};

const logInUser = (req, res) => {
    bcryptHelper.comparePassAndHash(req.body.payload.password, req.body.hash)
        .then(result => {
            if (result) {
                jwtHelper.jwtGenerateToken(req.body.header, req.body.payload)
                    .then(token => {
                        console.log("API: token expiration ", token.expires)
                        //TOOD: set the login status in the postgresql data-base
                    })
            }
            else {
                res.status(403).json("Login failed - Invalid password")
            }
        }, err => {
            console.log(err);
            res.status(500).json("Error handling request - Server Error!");
        });
};

const logOutUserRequest = (app) => {
    app.post("/logout-user-request/", sanitizeAuthentication, (req, res, next) => {

        // sanitize the request
        const error = validationResult(req)

        if (error.isEmpty()) {
            //TODO: check existing data element in postgresql data-base
        }
        else {
            console.log(error);
            res.status(500).json("Error handling request: " + result.error[0].path + " invalid");
        }

    }, logOutUser);
};

const logOutUser = (req, res) => {
    bcryptHelper.comparePassAndHash(req.body.password, req.body.hash)
        .then(result => {
            if (result) {
                jwtHelper.jwtAuthenticateToken(req.body.authentication)
                    .then(authenticity => {

                        if (authenticity) {
                            // TODO: set the log-in status for the postgresql data-base
                        }
                        else {
                            res.status(403).json("Error handling request - invalid token");
                        }

                    }, err => {
                        console.log(err)
                        res.status(500).json("Error handling request - Server Error!");
                    })
            }
            else {
                res.status(403).json("Logout failed - Invalid password")
            }
        }, err => {
            console.log(err);
            res.status(500).json("Error handling request - Server Error!");
        });
};

const deleteUserRequest = (app) => {
    app.post("/delete-user-request/", sanitizeAuthentication, (req, res, next) => {
        const error = validationResult(req);
        if (error.isEmpty()) {
            //TODO: check exsiting dat element in postgresql data-base
        }
        else {
            console.log(error);
            res.status(500).json("Error handling request: " + result.error[0].path + " invalid");
        }
    }, deleteUser);
};

const deleteUser = (req, res) => {
    bcryptHelper.comparePassAndHash(req.body.password, req.body.hash)
        .then(result => {
            if (result) {
                jwtHelper.jwtAuthenticateToken(req.body.authentication)
                    .then(authenticity => {
                        if (authenticity) {
                            //TODO: remove the user from the postgresql data-base

                        }
                    })
            }
            else {
                res.status(500).json("Error handling request - Token invalid.");
            }
        }, err => {
            console.log(err);
            res.status(500).json("Error handling request - Server Error!");
        });
};

const userService = {
    createUserRequest,
    logInUserRequest,
    logOutUserRequest,
    deleteUserRequest
};

module.exports = { userService };