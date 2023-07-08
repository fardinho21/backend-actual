const fs = require("fs");
const http = require("http");
// const https = require("https");
const {app} = require("./app-server.js");
const { jwtHelper } = require("./jwt-service.js")
const port = parseInt(process.env.PORT) || 8080;

// DO NOT DELETE
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
    console.log("\nServer Shutdown - SIGINT recieved\nClearing Intervals...")
    jwtHelper.jwtClearCheckForValidTokensInterval();
    process.exit()
}

app.set("port", port);


const server = http.createServer(app);

// DO NOT DELETE
// const server = https.createServer(options, app)

server.on("listening", onListening)
server.on("error", onError);
process.on("SIGINT", onClose);
server.listen(port);