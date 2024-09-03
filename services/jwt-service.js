const mongoose = require("mongoose");
const { clearInterval } = require("timers");
const { dataBaseSchemas } = require("../db-schemas/database-schemas");
mongoose.connect("mongodb://localhost:27017/local");
const userModel = mongoose.model("users", dataBaseSchemas.UserSchema)

const util = require("node:util");
const exec = util.promisify(require('node:child_process').exec);
const crypto = require("crypto");

const jwtGenerateToken = (header, payload) => {
    return exec("cat serverCert.pem | grep -vP '(-----.+-----)'")
    .then(data => {
        let temppayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
        let tempheader = Buffer.from(JSON.stringify(header)).toString('base64url')
        let hashThis = tempheader+"."+temppayload;

        let tempkey = data.stdout.replace(/[\t\n\r]/gm,'')
        const hmac = crypto.createHmac("sha256", tempkey);
        let hashedTemp = hmac.update(hashThis);
        const hashed = hashedTemp.digest('base64url');
        var d = new Date();
        d.setMinutes(d.getMinutes() + 3);
        return {token:hashThis+"."+hashed, expires: d }
    }, err => {throw new Error("Server Error - ", err)})
};

const jwtAuthenticateToken = (token) => {

    return exec("cat serverCert.pem | grep -vP '(-----.+-----)'")
    .then(data => {
        const authToken = token.split(".");
        const header = authToken[0]
        const payload = authToken[1]
        let authenticateThis = header+"."+payload;

        let tempkey = data.stdout.replace(/[\t\n\r]/gm,'')
        const hmac = crypto.createHmac("sha256", tempkey);
        let hashedTemp = hmac.update(authenticateThis);
        const hashed = hashedTemp.digest('base64url');

        return authToken[2]  == hashed

    }, err => {throw new Error("Server Error - ", err)});
};

const jwtCheckTokenStatuses = () => {
    return userModel.find({expires: {$lt: new Date()}})
};

const jwtInvalidateExpiredTokens  = () => {
    return userModel.updateMany({expires: {$lt: new Date()}}, {$set: { authentication: "invalid", expires: null }})
};

const jwtClearCheckForValidTokensInterval = () => {
    clearInterval(checkForValidTokensInterval);
}

const checkForValidTokensInterval = setInterval(() => {
    console.log("Check for token statuses");
    userModel.count({expires: {$lt: new Date()}})
    .then(count => {
        if (count > 0)
        {
            console.log(count)
            jwtInvalidateExpiredTokens()
            .then(result => {
                console.log("result", result)
            })
        }
        else 
        {
            console.log("No user tokens are expired.")
        }
    })

}, 5000);

const jwtHelper = {
    jwtGenerateToken, 
    jwtAuthenticateToken, 
    jwtCheckTokenStatuses, 
    jwtInvalidateExpiredTokens, 
    jwtClearCheckForValidTokensInterval, 
    checkForValidTokensInterval
};

module.exports = {jwtHelper};
