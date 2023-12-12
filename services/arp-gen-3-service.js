const {dataBaseSchemas} = require("../db-schemas/database-schemas.js")
const {ArpeggioGenerator} = require("../services/nodejs-arp-gen/ArpeggioGenerator.js")

// API ENDPOINTS

const submitUserInputEndpoint = (app) =>
{
    app.post("/arpgen3/submit-user-input", (req, res, next) => 
    {
        try 
        {
            next()
        } 
        catch (error) 
        {
            res.status(500).json(error);
        }
    }, arpeggiateScale)
};

const arpeggiateScale = async (req, res) => 
{
    try 
    {

        // Spawn python process
        var note = req.body.note;
        var scale = req.body.scale;
        var startingString = req.body.startingString;
        var startingOctave = req.body.startingOctave;
        var fretOrNote = req.body.fretOrNote
        // var direction = req.body.direction;
        // var axis = req.body.axis;



        var arpPromise = new Promise((resolve, reject) => {
            var arp = new ArpeggioGenerator(note, scale, startingString, startingOctave, "ASCENDING", "HORIZONTAL", 6, "EADGBE", "number");
            resolve(arp.arpeggiateScale());
        })

        await arpPromise
        .then(result => {res.status(200).json({"result": result})})
        .catch(error => {res.status(500).json({"error": "Server Error "})})


    }
    catch (error) 
    {
        res.status(500).json({ "error": "Server Error " })
    }
};

//TODO
const checkSubscriptionStatus = (app) =>
{
    app.get("/arpgen3/check-subscription-status/", (req, res) =>
    {
        try 
        {
            
        } 
        catch (error) 
        {
            
        }
    })
}

const arpGen3Service = 
{
    checkSubscriptionStatus,
    submitUserInputEndpoint,
};

module.exports = {arpGen3Service};