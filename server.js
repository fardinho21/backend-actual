const fs = require("fs");
const http = require("http");
// const https = require("https");
const {app, checkForValidTokensInterval} = require("./app-server.js");
const { clearInterval } = require("timers");
const port = parseInt(process.env.PORT) || 8080;

// const options = {
//     key: fs.readFileSync('./no-pass-key.pem'),
//     cert: fs.readFileSync('./test-cert.pem')
// }


const onListening = () => {
    console.log("Listening on port: " , port)
}

const onError = error => {
    console.log("Error: ",error)
}

const onClose = () => {
    clearInterval(checkForValidTokensInterval);
}

app.set("port", port);


const server = http.createServer(app);

// const server = https.createServer(options, app)

server.on("listening", onListening)
server.on("error", onError);
server.on("close", onClose);
server.listen(port);