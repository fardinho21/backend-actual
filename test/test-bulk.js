
const util = require("util");
const exec = util.promisify(require('child_process').exec);
const execSync = require('child_process').execSync;
const prompt = require('prompt-sync')();

////////////////////////////////////////////////
////// SETTING UP VARIABLES
////////////////////////////////////////////////

const urlBase = "http://localhost:8080"

////// COLORS
const resetColor = "\x1b[0m"
const brightColor = "\x1b[1m"
const fgRed = "\x1b[31m"
const fgGreen = "\x1b[32m"


////// SETTING UP USER
const genericUserBase = "genericUser"

var testCase = {}
testCase.password='"password1234!"'
testCase.header='{"alg":"HS256","typ":"JWT"}'
testCase.authentication='""'

////// CURL COMMANDS
var curlBasePost='curl -X POST -H "Content-Type: application/json" -d'
var requestQueue = []

////// TEST LOOP
for (var i = 4; i<=20; i++)
{
    testCase.username = `"genericUser${i.toString()}"`;
    testCase.payload = `{"dev":"IPhone", "osv":"iOS-17","appv":"1.0.0a", "username":${testCase.username}, "password":${testCase.password}}`
    var createUserCurl = `${curlBasePost} '{"header":${testCase.header},"payload":${testCase.payload}}' ${urlBase}/create-user-request`
    var loginUserCurl = `${curlBasePost} '{"header":${testCase.header},"payload":${testCase.payload}}' ${urlBase}/login-user-request`
    var logoutUserCurl = `${curlBasePost} '{"username":${testCase.username}, "password":${testCase.password}, "authentication":${testCase.authentication}}' ${urlBase}/logout-user-request`
    var requestObject = { testCase: testCase, createCurl: createUserCurl, loginCurl: loginUserCurl, logoutCurl: logoutUserCurl }
    requestQueue.push(JSON.parse(JSON.stringify(requestObject)))
}

for (var e in requestQueue) 
{
    var requestObject = requestQueue[e]
    execSync(requestObject.createCurl)
    prompt("Press Enter...")
    exec(requestObject.loginCurl)
    .then(data => console.log(data))

}