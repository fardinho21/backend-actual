const fs = require("fs");
const app = require("./app-server");
const http = require("http");
const port = parseInt(process.env.PORT) || 8080;


const onListening = () => {
    console.log("Listening on port: " , port)
}

const onError = error => {
    console.log("Error: ",error)
}

app.set("port", port);


const server = http.createServer(app);

server.on("listening", onListening)
server.on("error", onError);
server.listen(port);