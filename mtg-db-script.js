const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");

// DATA BASE SCHEMAS AND MODELS
mongoose.connect("mongodb://localhost:27017/local")
const mtgSetModel = mongoose.model("mtg-sets", dataBaseSchemas.MTGSetSchema);

const re = /\([A-Z]{3,4}\)/g //match four letter code
const re1 = /\([A-Z|0-9]{3,5}\)/

const loadMTGSetNames = async () =>
{
    const fileStream = fs.createReadStream("./temp/set-titles");
    const rl = readline.createInterface({input:fileStream, crlfDelay: 10});
    rl.on('line', data => {
        intoDatabase(data)
    })
    
 
}

const intoDatabase = mtgSetCode =>
{   
    const matches = mtgSetCode.match(re1)
    try 
    {
        // console.log(matches[0], matches.input)
        let temp = matches.input
        let setname = temp.replace(matches[0], "")
        mtgSetModel.insertOne({setName: setname, setCode: matches[0]});
    } 
    catch (error)
    {
        // console.log(error);
    }
}

const mtgDBScript = {loadMTGSetNames};

module.exports = {mtgDBScript};