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

const loadMTGSetData = () =>
{
    const fileStream = fs.createReadStream("./temp/set-titles");
    const rl = readline.createInterface({input:fileStream, crlfDelay: 10});
    rl.on('line', addMTGSetToDB)
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

const loadMTGSetImages = () =>
{
    fs.readdirSync("./temp/images/").forEach(file =>{
        let cardList = [];
        let documentName = file.split("-")[2].toUpperCase();
        //1. read the file get the set code
        //2. add the <img\> tag from each line in the file to the card list
        //3. put in collection as document with setCode and cardList full.
        let fileStream = fs.createReadStream(`./temp/images/${file}`);
        let rl = readline.createInterface({input: fileStream, crlfDelay: 10});
        rl.on("line", data => {cardList.push(data)});
        rl.on("close", () => {
            addMTGSetWithCardsToDB({setCode: documentName, cardList: cardList});
        });
    });

}

const addMTGSetWithCardsToDB = mtgData =>
{
    try
    {
        mtgSetWithCardsModel.insertMany(mtgData)
        .then(result => {console.log(result)});
    }
    catch (error)
    {
        // console.log(error);
    }
}

const mtgDBScript = {loadMTGSetData, loadMTGSetImages};

module.exports = {mtgDBScript};