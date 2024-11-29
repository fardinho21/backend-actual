///////////////////////////////// APPLICATION BOILERPLATE START ///////////////////////////////////////////////////// 
const { stripeFeatureService } = require("./services/stripe-feature-service.js");
const { userService } = require("./services/user-service.js"); // API endpoints
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
userService.createUserRequest(app);
userService.logInUserRequest(app);
userService.logOutUserRequest(app);
userService.deleteUserRequest(app);
/////////////////// USER SERVICES ENDPOINTS END

/////////////////// STRIPE FEATURE SERVICE ENDPOINTS START
stripeFeatureService.initiateCheckoutSession(app);
stripeFeatureService.createProduct(app);
stripeFeatureService.updateProduct(app);
stripeFeatureService.createCustomer(app);
stripeFeatureService.createPaymentCardForExistingCustomer(app);
stripeFeatureService.createPaymentRequest(app);
/////////////////// STRIPE FEATURE SERVICE ENDPOINTS END


/////////////////////// API CODE ENDS HERE ////////////////////

// EXPORTS
module.exports = {app};
