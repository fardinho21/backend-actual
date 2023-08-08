
// DATA BASE SCHEMAS AND MODELS
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");
mongoose.connect("mongodb://localhost:27017/local");
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgCardModel = mongoose.model("mtgSetWithCards", dataBaseSchemas.MTGCardSchema)

const searchCardByName = (app) => 
{
    app.post("/search-card-by-name/", (req, res) =>
    {
        console.log(req.body.cardName)
        mtgCardModel.find({ cardName: req.body.cardName }, "cardName")
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
        mtgSetModel.find({ setName: req.body.setName }, "setName")
            .then(data => {
                console.log(data)
                res.status(200).json("GOOD")
            })
    })
}

const mtgFeatureService = {searchCardByName, searchSetByName};
module.exports = {mtgFeatureService}