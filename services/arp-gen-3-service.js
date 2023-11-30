


// API ENDPOINTS
const arpeggiateScale = (app) =>
{
    app.get("/arppeggiateScale/", (req, res) => 
    {
        try 
        {
            const spawn = require("child_process").spawn;
            console.log("arp-gen-3-service:: arpeggiateScale")

            // Spawn python process
            var root = req.body.root;
            var scale = req.body.scale;
            var startStringIndex = req.body.startStringIndex;
            var startOctave = req.body.startOctave;
            var direction = req.bddy.direction;
            var axis = req.body.axis;

            const python3Process = spawn('python3', ["arp-gen-utils/py-arp-gen-3/main.py", root, scale, startStringIndex, startOctave, direction, axis])

            python3Process.stdout.on('data', async data => {
                res.status(200).json(await data.toString())
            })
            python3Process.stderr.on('data', async data => {
                console.log(await data.toString())
                res.status(500).json({ "error": "Server Error - script error" })
            })
        } 
        catch (error) 
        {
            res.status(500).json({"error": "Server Error "})
        }
    })
};

const checkSubscriptionStatus = (app) =>
{
    app.get("/arpgen3/checkSubscriptionStatus/", (req, res) =>
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
    arpeggiateScale,
    checkSubscriptionStatus,
};

module.exports = {arpGen3Service};