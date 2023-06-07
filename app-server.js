const { check, validationRequest, sanitize } = require("express-validator");
const { createUser, logInUser } = require("./user-service");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

//mongoose.connect("");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.disable("x-powered-by")

///////////////////////////////////////////API CODE STARTS HERE

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

///////////////////////////////////////////API CODE ENDS HERE

module.exports = app;
