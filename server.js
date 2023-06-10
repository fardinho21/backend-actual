const fs = require("fs");
const http = require("http");
// const https = require("https");
const app = require("./app-server");
const port = parseInt(process.env.PORT) || 8080;

const options = {
    key: fs.readFileSync('./no-pass-key.pem'),
    cert: fs.readFileSync('./test-cert.pem')
}


const onListening = () => {
    console.log("Listening on port: " , port)
}

const onError = error => {
    console.log("Error: ",error)
}

app.set("port", port);


const server = http.createServer(app);

// const server = https.createServer(options, app)

server.on("listening", onListening)
server.on("error", onError);
server.listen(port);