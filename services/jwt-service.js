const { clearInterval } = require("timers");
const util = require("node:util");
const exec = util.promisify(require('node:child_process').exec);
const crypto = require("crypto");

const jwtGenerateToken = (header, payload) => {
    return exec("cat certs/serverCert.pem | grep -vP '(-----.+-----)'")
        .then(data => {
            let temppayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
            let tempheader = Buffer.from(JSON.stringify(header)).toString('base64url')
            let hashThis = tempheader + "." + temppayload;

            let tempkey = data.stdout.replace(/[\t\n\r]/gm, '')
            const hmac = crypto.createHmac("sha256", tempkey);
            let hashedTemp = hmac.update(hashThis);
            const hashed = hashedTemp.digest('base64url');
            var d = new Date();
            d.setMinutes(d.getMinutes() + 3);
            return { token: hashThis + "." + hashed, expires: d }
        }, err => { throw new Error("Server Token Generation Error - ", err) })
        .catch(error => { throw new Error("Server Token Generation Error - ", error) })
};

const jwtAuthenticateToken = (token) => {

    return exec("cat certs/serverCert.pem | grep -vP '(-----.+-----)'")
        .then(data => {
            const authToken = token.split(".");
            const header = authToken[0]
            const payload = authToken[1]
            let authenticateThis = header + "." + payload;

            let tempkey = data.stdout.replace(/[\t\n\r]/gm, '')
            const hmac = crypto.createHmac("sha256", tempkey);
            let hashedTemp = hmac.update(authenticateThis);
            const hashed = hashedTemp.digest('base64url');

            return authToken[2] == hashed

        }, err => { throw new Error("Server Error Token Authentication  - ", err) });
};

const jwtCheckTokenStatuses = () => {
    //TODO: query postgresql data-base for token statuses
};

const jwtInvalidateExpiredTokens = () => {
    //TODO: invalidate expired tokens in postgresql data-base
};

const jwtClearCheckForValidTokensInterval = (interval) => {
    clearInterval(interval);
}

const checkForValidTokensInterval = () => {
    return setInterval(() => {
        console.log("Check for token statuses");
        //TODO check postgresql data-base for valid tokens

    }, 5000);
}


const jwtHelper = {
    jwtGenerateToken,
    jwtAuthenticateToken,
    jwtCheckTokenStatuses,
    jwtInvalidateExpiredTokens,
    jwtClearCheckForValidTokensInterval,
    checkForValidTokensInterval
};

module.exports = { jwtHelper };
