
// DATA BASE SCHEMAS AND MODELS
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("../db-schemas/database-schemas.js");

mongoose.connect("mongodb://localhost:27017/local");
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgSetCodeModel = mongoose.model("mtgSetWithCards", dataBaseSchemas.MTGCardSchema)
const mtgSetCodesWithCardsModel = mongoose.model("mtgSetCodesWithCards", dataBaseSchemas.MTGSetCodeWithCardsSchema);
const mtgAllCardsModel = mongoose.model("mtgAllCards", dataBaseSchemas.MTGCardSchema);

const searchCardByName = (app) => 
{
    app.post("/search-card-by-name/", (req, res) =>
    {
        mtgAllCardsModel.find({ cardName: { $regex :req.body.cardName } }).skip(req.body.skipNum * 5).limit(req.body.limitNum)
            .then(data => {
                res.status(200).json(data)
            })
    })
}

const searchSetByName = (app) => 
{
    app.post("/search-set-by-name/", (req, res) => 
    {
        mtgSetModel.find({ setName: { $regex: req.body.setName } }).skip(req.body.skipNum * 5).limit(req.body.limitNum)
            .then(data => {
                res.status(200).json(data)
            })
    })
}

const searchSetByCode = (app) => 
{
    app.post("/search-set-by-code/", (req, res) => 
    {
        mtgSetCodeModel.find({ setCode: { $regex: req.body.setCode } }).skip(req.body.skipNum * 5).limit(req.body.limitNum)
            .then(data => {
                res.status(200).json(data)
            })
    })
}

const mtgFeatureService = {searchCardByName, searchSetByName, searchSetByCode};
module.exports = {mtgFeatureService};