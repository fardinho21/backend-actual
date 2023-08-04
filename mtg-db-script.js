const fs = require("fs");
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");

const loadMTGSetNames = (setNames) =>
{
    const data = fs.readFileSync("./temp/four-letter-codes", {encoding: "utf8", flag: "r"})
    console.log(data)
}

const mtgDBScript = {loadMTGSetNames};

module.exports = {mtgDBScript};