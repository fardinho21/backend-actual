///////////////////////////////// APPLICATION BOILERPLATE START ///////////////////////////////////////////////////// 
const { jwtHelper } = require("./jwt-service.js")
const { createUserRequest, logInUserRequest, logOutUserRequest } = require("./user-service.js"); // API endpoints
const mongoose = require("mongoose"); // database
// mongoose.connect("");
const express = require("express"); // backend framework
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
app.disable("x-powered-by")

//TODO: set up periodic event to clear out tokens that are expired.
const checkForValidTokensInterval = setInterval(jwtHelper.jwtCheckTokenStatuses, 1000)
/////////////////////////////////// APPLICATION BOILERPLATE END /////////////////////////////////////////////////// 
/////////////////////// API CODE STARTS HERE ////////////////////


/////////////////// USER SERVICES ENDPOINTS START
createUserRequest(app, mongoose);
logInUserRequest(app, mongoose);
logOutUserRequest(app, mongoose);
/////////////////// USER SERVICES ENDPOINTS END
/////////////////////// API CODE ENDS HERE ////////////////////

// EXPORTS
module.exports = app;
