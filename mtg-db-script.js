const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");

// DATA BASE SCHEMAS AND MODELS
mongoose.connect("mongodb://localhost:27017/local")
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgSetWithCardsModel = mongoose.model('mtgSetWithCards', dataBaseSchemas.MTGSetWithCardsSchema);

const re = /\([A-Z]{3,4}\)/g //match four letter code
const re1 = /\([A-Z|0-9]{3,5}\)/

const loadMTGSetData = async () =>
{
    const fileStream = fs.createReadStream("./temp/set-titles");
    const rl = readline.createInterface({input:fileStream, crlfDelay: 10});
    rl.on('line', data => {
        addMTGSetToDB(data)
    })
    
 
}

const addMTGSetToDB = mtgSetCode =>
{   
    const matches = mtgSetCode.match(re1)
    try 
    {
        // console.log("inserting into database")
        let temp = matches.input
        let setname = temp.replace(matches[0], "")
        mtgSetModel.insertMany({setName: setname, setCode: matches[0]})
        .then(data => console.log(data));
    } 
    catch (error)
    {
        // console.log(error);
    }
}

const addMTGSetWithCardsToDB = mtgData =>
{
    try
    {

    }
    catch (error)
    {
        // console.log(error);
    }
}

const mtgDBScript = {loadMTGSetData};

module.exports = {mtgDBScript};