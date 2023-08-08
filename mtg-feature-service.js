
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
        console.log(req.body.data)
        res.status(200).json("SUCCESS")
    })
}

const searchSetByName = (app) => 
{
    app.post("/search-set-by-name/", (req, res) => 
    {
        console.log(req.body.data)
        res.status(200).json("SUCCESS")
    })
}

const mtgFeatureService = {searchCardByName, searchSetByName};
module.exports = {mtgFeatureService}