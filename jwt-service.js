const util = require("node:util");
const exec = util.promisify(require('node:child_process').exec);
const crypto = require("crypto")

const jwtGenerateToken = (header, payload) => {
    exec("cat server.cert | grep -vP '(-----.+-----)'")
    .then(data => {
        // TODO use JWT to sign the generate HMACSHA256 using header and payload
        let tempkey = data.stdout.replace(/[\t\n\r]/gm,'')
        let temppayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
        let tempheader = Buffer.from(JSON.stringify(header)).toString('base64url')
        let hashThis = temppayload+"."+tempheader;
        const hmac = crypto.createHmac("sha256", tempkey);
        let hashedTemp = hmac.update(hashThis);
        const hashed = hashedTemp.digest('base64url');
        // console.log(tempkey)
        console.log(tempheader)
        console.log(temppayload)
        console.log(hashed)
    })
};

const jwtVerifyToken = (token) => {

}

const jwtHelper = {jwtGenerateToken, jwtVerifyToken}

module.exports = {jwtHelper};
