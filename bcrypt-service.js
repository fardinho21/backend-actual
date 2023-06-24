const util = require("node:util");
const exec = util.promisify(require('node:child_process').exec);
const bcrypt = require("bcrypt");

const generatePassHash = (pw) => {
    return bcrypt.hash(pw, 0);
}

const bcryptHelper =  {generatePassHash}

module.exports = {bcryptHelper};