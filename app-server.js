///////////////////////////////// APPLICATION BOILERPLATE START ///////////////////////////////////////////////////// 
const { mtgFeatureService } = require("./services/mtg-feature-service.js");
const { stripeFeatureService } = require("./services/stripe-feature-service.js")
const { createUserRequest, logInUserRequest, logOutUserRequest } = require("./services/user-service.js"); // API endpoints
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


/////////////////// USER SERVICES ENDPOINTS START
createUserRequest(app, mongoose);
logInUserRequest(app, mongoose);
logOutUserRequest(app, mongoose);
mtgFeatureService.searchCardByName(app);
mtgFeatureService.searchSetByName(app)
mtgFeatureService.searchSetByCode(app)
stripeFeatureService.checkoutSession(app);
stripeFeatureService.createProduct(app);
stripeFeatureService.createCustomer(app);
stripeFeatureService.createCustomer(app);

/////////////////// USER SERVICES ENDPOINTS END
/////////////////////// API CODE ENDS HERE ////////////////////

// EXPORTS
module.exports = {app};
