const util = require("node:util");
const exec = util.promisify(require('node:child_process').exec);
const crypto = require("crypto")

const jwtGenerateToken = (header, payload) => {
    return exec("cat serverCert.pem | grep -vP '(-----.+-----)'")
    .then(data => {
        // TODO use JWT to sign the generate HMACSHA256 using header and payload
        let temppayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
        let tempheader = Buffer.from(JSON.stringify(header)).toString('base64url')
        let hashThis = tempheader+"."+temppayload;

        let tempkey = data.stdout.replace(/[\t\n\r]/gm,'')
        const hmac = crypto.createHmac("sha256", tempkey);
        let hashedTemp = hmac.update(hashThis);
        const hashed = hashedTemp.digest('base64url');
        return {header:tempheader, payload: temppayload, hash: hashed}
    })
};

const jwtAuthenticateToken = (token) => {

    return exec("cat serverCert.pem | grep -vP '(-----.+-----)'")
    .then(data => {
        const authToken = token.split(" ")[1].split(".");
        console.log(authToken)
        const header = authToken[0]
        const payload = authToken[1]
        let authenticateThis = header+"."+payload;
        console.log(authenticateThis)

        let tempkey = data.stdout.replace(/[\t\n\r]/gm,'')
        const hmac = crypto.createHmac("sha256", tempkey);
        let hashedTemp = hmac.update(authenticateThis);
        const hashed = hashedTemp.digest('base64url');
        console.log(authToken[2])
        console.log(hashed)
        return authToken[2]  == hashed

    });
}

const jwtHelper = {jwtGenerateToken, jwtAuthenticateToken}

module.exports = {jwtHelper};
