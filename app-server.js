///////////////////////////////// APPLICATION BOILERPLATE START ///////////////////////////////////////////////////// 
const { mtgFeatureService } = require("./services/mtg-feature-service.js");
const { stripeFeatureService } = require("./services/stripe-feature-service.js");
const { shippingFeatureService } = require("./services/shipping-feature-service.js");
const { arpGen3Service } = require("./services/arp-gen-3-service.js")
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
/////////////////// USER SERVICES ENDPOINTS END

/////////////////// STRIPE FEATURE SERVICE ENDPOINTS START
stripeFeatureService.checkoutSession(app);
stripeFeatureService.createProduct(app);
stripeFeatureService.updateProduct(app);
stripeFeatureService.createCustomer(app);
stripeFeatureService.createPaymentCardForExistingCustomer(app);
stripeFeatureService.createPaymentRequest(app);
stripeFeatureService.storeNewCustomerData(app);
/////////////////// STRIPE FEATURE SERVICE ENDPOINTS END

/////////////////// SHIPPING FEATURE SERVICE ENDPOINTS START
shippingFeatureService.createShippingLabel(app);
shippingFeatureService.calculateCostAndTax(app);
shippingFeatureService.createShippingLabel(app);
shippingFeatureService.validateAddress(app);
/////////////////// SHIPPING FEATURE SERVICE ENDPOINTS END

/////////////////// MTG FEATURE SERVICES START
mtgFeatureService.searchCardByName(app);
// mtgFeatureService.searchSetByName(app)
mtgFeatureService.searchSetByCode(app);
/////////////////// MTG FEATURE SERVICES END

/////////////////// ARP-GEN-3 FEATURE SERVICE ENDPOINTS END
arpGen3Service.arpeggiateScale(app);
/////////////////// ARP-GEN-3 FEATURE SERVICE ENDPOINTS END


/////////////////////// API CODE ENDS HERE ////////////////////

// EXPORTS
module.exports = {app};
