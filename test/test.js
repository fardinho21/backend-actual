const util = require("util");
const exec = util.promisify(require('child_process').exec);

// COLORS
const resetColor = "\x1b[0m"
const brightColor = "\x1b[1m"
const fgRed = "\x1b[31m"
const fgGreen = "\x1b[32m"

const urlBase = "http://localhost:8080/"
var createUserCurl = `curl -X POST -H "Content-Type: application/json" -d '{"header":{"alg":"HS256","typ":"JWT"},"payload":{"dev":"IPhone","osv":"iOS-17","appv":"1.0.0a"},"username":"genericUser0","password": "password1234!"}' http://localhost:8080/create-user-request`

var loginUserCurl = `curl -X POST -H "Content-Type: application/json" -d '{"header":{"alg":"HS256","typ":"JWT"},"payload":{"dev":"IPhone","osv":"iOS-17","appv":"1.0.0a"}, "username":"genericUser0", "password":"password1234!"}' http://localhost:8080/login-user-request`

// createUser Unit test
exec(createUserCurl)
.then(result => {
    
    try 
    {
        if (result.stdout == `"User created!"`)
            console.log( fgGreen, "CreateUserUnitTest SUCCESS : response : ", resetColor, result.stdout)
        else if (result.stdout == `"Error handling request - Username taken"`)
            console.log(fgGreen, "CreateUserUnitTest SUCCESS : response : ", resetColor, result.stdout)
        else
            console.log(fgRed,"CreateUserUnitTest FAILED: error : ",resetColor, result.stdout)
    } catch (error) {
        console.log( "CreateUserUnitTest FAILED: error : ", error, result)
    }

}, err => {console.log(err)})


// loginUserUnitTest
exec(loginUserCurl)
.then(result => {
    
    try 
    {
        var o = JSON.parse(result.stdout)
        console.log( "object type: ", typeof o)
        if (typeof o == "object" && "authentication" in o)
            console.log(fgGreen,"LogInUserUnitTest SUCCESS : response : \n",resetColor, o)
        else if (typeof o == "string" && o == `Error handling request - Username does not exist`)
            console.log(fgGreen, "LogInUserUnitTest SUCCESS : response :", resetColor, o )
    } catch (error) {
        console.log(fgRed, "LogInUserUnitTest FAILED: error : ", resetColor, error, result)
    }

}, err => {console.log(err)})

//TODO logout user tests