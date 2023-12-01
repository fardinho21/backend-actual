const {dataBaseSchemas} = require("../db-schemas/database-schemas.js")


// API ENDPOINTS

const submitUserInputEndpoint = (app) =>
{
    app.post("/arpgen3/submit-user-input", (req, res, next) => 
    {
        try 
        {
            console.log(req.body)
            next()
        } 
        catch (error) 
        {
            res.status(500).json(error);
        }
    }, arpeggiateScale)
};

const arpeggiateScale = (req, res) => 
{
    try 
    {
        const spawn = require("child_process").spawn;
        console.log("arp-gen-3-service:: arpeggiateScale")

        // Spawn python process
        var note = req.body.note;
        var scale = req.body.scale;
        var startingString = req.body.startingString;
        var startingOctave = req.body.startingOctave;
        var fretOrNote = req.body.fretOrNote
        // var direction = req.body.direction;
        // var axis = req.body.axis;

        const python3Process = spawn('python3', ["services/arp-gen-utils/py-arp-gen-3/main.py", note, scale, startingString, startingOctave, "ASCENDING", "VERTICAL", fretOrNote])

        python3Process.stdout.on('data', async data => 
        {
            console.log(data)
            var fin = await data.toString()
            res.status(200).json(fin)
        })
        python3Process.stderr.on('data', async data => 
        {
            console.log(await data.toString())
            res.status(500).json({ "error": "Server Error - script error" })
        })
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