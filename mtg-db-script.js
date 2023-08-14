const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");

// DATA BASE SCHEMAS AND MODELS
mongoose.connect("mongodb://localhost:27017/local")
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgSetCodeWithCardsModel = mongoose.model('mtgSetWithCards', dataBaseSchemas.MTGSetCodeWithCardsSchema);
const mtgCardsModel = mongoose.model("mtgAllCards", dataBaseSchemas.MTGCardSchema);

const re = /\([A-Z]{3,4}\)/g //match four letter code
const re1 = /\([A-Z|0-9]{3,5}\)/
const title_re = /title\=\".+\)\"/g
const src_re = /src\=\".+\"/g

const loadMTGSetData = () =>
{
    const fileStream = fs.createReadStream("./temp/set-titles");
    const rl = readline.createInterface({input:fileStream, crlfDelay: 10});
    rl.on('line', addMTGSetToDB)
}

const addMTGSetToDB = (mtgSetCode) =>
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
        let fileStream = fs.createReadStream(`./temp/images/${file}`);
        let rl = readline.createInterface({input: fileStream, crlfDelay: 10});
        rl.on("line", data => {cardList.push(data)});
        rl.on("close", () => {
            addMTGSetWithCardsToDB({setCode: documentName, cardList: cardList});
        });
    });

}

const addMTGSetWithCardsToDB = (mtgData) =>
{
    try
    {
        mtgSetCodeWithCardsModel.insertMany(mtgData)
        .then(result => {console.log(result)});
    }
    catch (error)
    {
        // console.log(error);
    }
}

const loadMTGCardData = () =>
{
    const fileStream = fs.createReadStream("./temp/all-cards");
    const rl = readline.createInterface({input:fileStream, crlfDelay: 10});
    rl.on('line', addMTGCardDataToDB)
}

const addMTGCardDataToDB = (mtgCardData) =>
{
    // TODO find out how to match the code
    const matches_title= mtgCardData.match(title_re);
    const matches_src= mtgCardData.match(src_re);
    const vals= matches_title[0].split("(");
    var cardName= vals[0].split("=")[1].trim();
    var setCode="("+vals.slice(-1);
    var imageUrl=matches_src[0].split("=")[1];
    cardName=cardName.replace('"','')
    setCode=setCode.replace('"','')
    imageUrl=imageUrl.replace('"','').replace('"','')
    const objectToDB= {cardName: cardName, setCode: setCode, imageUrl: imageUrl};

    // console.log(objectToDB);
    
    mtgCardsModel.insertMany(objectToDB)
    .then(result => {console.log(result)});
    
}

const mtgDBScript = {loadMTGSetData, loadMTGSetImages, loadMTGCardData};

module.exports = {mtgDBScript};