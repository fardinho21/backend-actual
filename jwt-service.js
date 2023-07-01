const mongoose = require("mongoose")
const { dataBaseSchemas } = require("./database-schemas");
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
        d.setMinutes(90);
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

// WIP
const jwtCheckTokenStatuses = () => {
    return userModel.find({expires: {$lt: new Date()}});
};

const jwtInvalidateExpiredTokens  = () => {
    return userModel.updateMany({expires: {$lt: new Date()}}, {authentication:"invalid", expires: null})
};

const jwtHelper = {jwtGenerateToken, jwtAuthenticateToken, jwtCheckTokenStatuses, jwtInvalidateExpiredTokens};

module.exports = {jwtHelper};
