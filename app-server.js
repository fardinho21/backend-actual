////////////////////// SECURITY START ///////////////////// 
const { check, validationRequest, sanitize } = require("express-validator"); // Sanitizers
const bcrypt = require("bcrypt"); // encryption
const jwt = require("jsonwebtoken"); // cookies/tokens
const fs = require("fs"); // filesystem
// const private_key = fs.readFIleSync(_dirname+"/path/to/pk.pem")// for https
///////////////////// SECURITY END ////////////////////// 

///////////////////////////////// APPLICATION BOILERPLATE START ///////////////////////////////////////////////////// 
const { createUser, logInUser } = require("./user-service"); // API endpoints
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
/////////////////////////////////// APPLICATION BOILERPLATE END /////////////////////////////////////////////////// 
/////////////////////// API CODE STARTS HERE ////////////////////
// VALIDATION AND SANITIZATION
app.get("*", (req, res, next) => {
    // sanitize incoming requests
    console.log("ENTRY");
    next();
});

/////////////////// USER SERVICES ENDPOINTS START
createUser(app, mongoose);
logInUser(app, mongoose);
/////////////////// USER SERVICES ENDPOINTS END
/////////////////////// API CODE ENDS HERE ////////////////////

// EXPORTS
module.exports = app;
