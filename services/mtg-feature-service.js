
// DATA BASE SCHEMAS AND MODELS
const mongoose = require("mongoose");
const {dataBaseSchemas} = require("../db-schemas/database-schemas.js");

mongoose.connect("mongodb://localhost:27017/local");
const mtgSetModel = mongoose.model("mtgAllCards", dataBaseSchemas.MTGCardSchema);
const mtgSetCodeModel = mongoose.model("mtgAllCards", dataBaseSchemas.MTGCardSchema);
const mtgAllCardsModel = mongoose.model("mtgAllCards", dataBaseSchemas.MTGCardSchema);
const mtgSetCodesWithCardsModel = mongoose.model("mtgSetCodesWithCards", dataBaseSchemas.MTGSetCodeWithCardsSchema);

const searchCardByName = (app) => 
{
    app.post("/search-card-by-name/", (req, res) =>
    {
        console.log("search-card-by-name")
        console.log("req.body.cardName: ", req.body.cardName)
        console.log("req.body.skipNum: ", req.body.skipNum)
        console.log("req.body.limitNum: ", req.body.limitNum)
        mtgAllCardsModel.find({ cardName: { $regex :req.body.cardName } }).skip(req.body.skipNum).limit(req.body.limitNum)
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
    })
}

// const searchSetByName = (app) => 
// {
//     app.post("/search-set-by-name/", (req, res) => 
//     {
//         console.log("search-set-by-name")
//         console.log("req.body.setName: ", req.body.setName)
//         console.log("req.body.skipNum: ", req.body.skipNum)
//         console.log("req.body.limitNum: ", req.body.limitNum)
//         mtgSetModel.find({ setName: { $regex: req.body.setName } }).skip(req.body.skipNum).limit(req.body.limitNum)
//             .then(data => {
//                 // console.log(data)
//                 res.status(200).json(data)
//             })
//     })
// }

const searchSetByCode = (app) => 
{
    app.post("/search-set-by-code/", (req, res) => 
    {
        console.log("search-set-by-code")
        console.log("req.body.setCode: ", req.body.setCode)
        console.log("req.body.skipNum: ", req.body.skipNum)
        console.log("req.body.limitNum: ", req.body.limitNum)
        mtgSetCodeModel.find({ setCode: { $regex: req.body.setCode } }).skip(req.body.skipNum).limit(req.body.limitNum)
            .then(data => {
                // console.log(data)
                res.status(200).json(data)
            })
    })
}

const mtgFeatureService = {
    searchCardByName, 
    // searchSetByName, 
    searchSetByCode
};

module.exports = {mtgFeatureService};