const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { check, validationRequest, sanitize } = require("express-validator");

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

////////API CODE STARTS HERE


app.get("/", (req, res, next) => {
    console.log("GET")
    res.status(200).json("hello world")
});



////////API CODE ENDS HERE

module.exports = app;
