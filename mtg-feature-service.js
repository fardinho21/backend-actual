const mongoose = require("mongoose");
const {dataBaseSchemas} = require("./database-schemas.js");

// DATA BASE SCHEMAS AND MODELS
mongoose.connect("mongodb://localhost:27017/local");
const mtgSetModel = mongoose.model("mtgSetTitles", dataBaseSchemas.MTGSetSchema);
const mtgCardModel = mongoose.model("mtgSetWithCards", dataBaseSchemas.MTGCardSchema)