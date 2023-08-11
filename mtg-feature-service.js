
// DATA BASE SCHEMAS AND MODELS
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");
mongoose.connect("mongodb://localhost:27017/local");
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgCardModel = mongoose.model("mtgSetWithCards", dataBaseSchemas.MTGCardSchema)
const mtgSetCodesWithCardsModel = mongoose.model("mtgSetCodesWithCards", dataBaseSchemas.MTGSetCodeWithCardsSchema);

const searchCardByName = (app) => 
{
    app.post("/search-card-by-name/", (req, res) =>
    {
        console.log(req.body.cardName)
        mtgCardModel.find({ cardName: { $regex :req.body.cardName } })
            .then(data => {
                console.log(data)
                res.status(200).json("GOOD")
            })
    })
}

const searchSetByName = (app) => 
{
    app.post("/search-set-by-name/", (req, res) => 
    {
        console.log(req.body.setName)
        mtgSetModel.find({ setName: { $regex: req.body.setName } })
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
    })
}

const searchSetByCode = (app) => 
{
    app.post("/search-set-by-code/", (req, res) => 
    {
        console.log(req.body.setCode); //TODO : database collection needs to be populated
        mtgSetModel.find({ setCode: { $regex: req.body.setCode } })
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
    })
}

const mtgFeatureService = {searchCardByName, searchSetByName, searchSetByCode};
module.exports = {mtgFeatureService}