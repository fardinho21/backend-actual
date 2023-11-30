const spawn = require("child_process").spawn;


const python3Process = spawn('python3', 
    ["./py-arp-gen-3/main.py", "A", "mel", "0", "2", "ASCENDING", "HORIZONTAL"])

python3Process.stdout.on('data', async data => {
    console.log( await data.toString())
})
python3Process.stderr.on('data', async data => {
    console.log( await data.toString())
    console.log(data.toString())
})