
const util = require("util");
const exec = util.promisify(require('child_process').exec);

////////////////////////////////////////////////
////// SETTING UP VARIABLES
////////////////////////////////////////////////

const urlBase = "http://localhost:8080"

////// COLORS
const resetColor = "\x1b[0m"
const brightColor = "\x1b[1m"
const fgRed = "\x1b[31m"
const fgGreen = "\x1b[32m"

////// TEST USERS
var username1='"genericUser1"'
var password1='"password1234!"'
var header1='{"alg":"HS256","typ":"JWT"}'
var payload1=`{"dev":"IPhone","osv":"iOS-17","appv":"1.0.0a", "username":${username1},"password": ${password1}}`
var authentication1=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJJUGhvbmUiLCJvc3YiOiJpT1MtMTciLCJhcHB2IjoiMS4wLjBhIiwidXNlcm5hbWUiOiJnZW5lcmljVXNlcjEiLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzNCEifQ.Upr6FEFGsxZV1lDWT7zE70pCw72hCGB-yXTkuowIYy4"`

var username2='"genericUser2"'
var password2='"password4321!"'
var header2=header1
var payload2=`{"dev":"Android","osv":"Snow Cone","appv":"1.0.0a", "username":${username2},"password":${password2}}`
var authentication2=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJBbmRyb2lkIiwib3N2IjoiU25vdyBDb25lIiwiYXBwdiI6IjEuMC4wYSIsInVzZXJuYW1lIjoiZ2VuZXJpY1VzZXIyIiwicGFzc3dvcmQiOiJwYXNzd29yZDQzMjEhIn0.ptybNtXndDaUfzCMOHfFPrgLfhjFOIrSOHWxq0UieM0"`

var username3='"genericUser3"'
var password3='"password1423"'
var header3=header1
var payload3=`{"dev":"Android","osv":"Tiramisu","appv":"1.0.0a", "username":${username3},"password":${password3}}`
var authentication3=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJBbmRyb2lkIiwib3N2IjoiVGlyYW1pc3UiLCJhcHB2IjoiMS4wLjBhIiwidXNlcm5hbWUiOiJnZW5lcmljVXNlcjMiLCJwYXNzd29yZCI6InBhc3N3b3JkMTQyMyJ9.0GIvcX1kMiuHDJ4NZRlTbnkcAZTruQFkkdOhZTOcjpM"`


//////////////////////////////////////////////////////
////// CURL COMMANDS
//////////////////////////////////////////////////////
var curlBasePost='curl -X POST -H "Content-Type: application/json" -d'
var createUserCurl = `${curlBasePost} '{"header":${header1},"payload":${payload1}}' ${urlBase}/create-user-request`
var loginUserCurl = `${curlBasePost} '{"header":${header1},"payload":${payload1}}' ${urlBase}/login-user-request`
var logoutUserCurl = `${curlBasePost} '{"username":${username1}, "password":${password1}, "authentication":${authentication1}}' ${urlBase}/logout-user-request`


//////////////////////////////////////////////////////
////// UNIT TESTS STARTT HERE
//////////////////////////////////////////////////////


// createUser Unit test
// exec(createUserCurl)
// .then(result => {
    
//     try 
//     {
//         if (result.stdout == `"User created!"`)
//             console.log( fgGreen, "CreateUserUnitTest SUCCESS : response : ", resetColor, result.stdout)
//         else if (result.stdout == `"Error handling request - Username taken"`)
//             console.log(fgGreen, "CreateUserUnitTest SUCCESS : response : ", resetColor, result.stdout)
//         else
//             console.log(fgRed,"CreateUserUnitTest FAILED: error : ",resetColor, result.stdout)
//     } catch (error) {
//         console.log( "CreateUserUnitTest FAILED: error : ", error, result)
//     }

// }, err => {console.log(err)})


// loginUserUnitTest
// exec(loginUserCurl)
// .then(result => {
//     try 
//     {
//         var o = JSON.parse(result.stdout)
//         if (typeof o == "object" && "authentication" in o)
//             console.log(fgGreen,"LogInUserUnitTest SUCCESS : response : \n",resetColor, o)
//         else if (typeof o == "string" && o == `Error handling request - Username does not exist`)
//             console.log(fgGreen, "LogInUserUnitTest SUCCESS : response :", resetColor, o )
//     } catch (error) {
//         console.log(fgRed, "LogInUserUnitTest FAILED: error : ", resetColor, error, result)
//     }

// }, err => {console.log(err)})

// logoutUserUnitTest
// exec(logoutUserCurl)
// .then(result => {
//     try 
//     {
//         var o = JSON.parse(result.stdout)
//         if (typeof o == "object" && "stdout" in o)
//             console.log(fgGreen,"LogoutUserUnitTest SUCCESS : response : \n",resetColor, o)
//         else if (typeof o == "string")
//             if (o == `Logged out` || 
//                 o == `Error handling request - Username does not exist` || 
//                 o == `Error handling request - Token invalid.`||
//                 o == "Logout failed - Invalid password")
//             {
//                 console.log(fgGreen, "LogoutUserUnitTest SUCCESS : response :", resetColor, o )
//             }
//     } catch (error) {
//         console.log(fgRed, "LogoutUserUnitTest FAILED: error : ", resetColor, error, result)
//     }
// }, err => {console.log(err)})