const bcrypt = require("bcrypt");

const generatePassHash = (pw) => {
    return bcrypt.hash(pw, 0);
}

const comparePassAndHash = (pw, hsh) => {
    return bcrypt.compare(pw, hsh);
}

const bcryptHelper =  {generatePassHash, comparePassAndHash}

module.exports = {bcryptHelper};