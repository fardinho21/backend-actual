
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
var testCase1 = {}
testCase1.username='"genericUser1"'
testCase1.password='"password1234!"'
testCase1.header='{"alg":"HS256","typ":"JWT"}'
testCase1.payload=`{"dev":"IPhone","osv":"iOS-17","appv":"1.0.0a", "username":${testCase1.username},"password": ${testCase1.password}}`
testCase1.authentication=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJJUGhvbmUiLCJvc3YiOiJpT1MtMTciLCJhcHB2IjoiMS4wLjBhIiwidXNlcm5hbWUiOiJnZW5lcmljVXNlcjEiLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzNCEifQ.Upr6FEFGsxZV1lDWT7zE70pCw72hCGB-yXTkuowIYy4"`
var testCase2 = {}
testCase2.username='"genericUser2"'
testCase2.password='"password4321!"'
testCase2.header=testCase1.header
testCase2.payload=`{"dev":"Android","osv":"Snow Cone","appv":"1.0.0a", "username":${testCase2.username},"password":${testCase2.password}}`
testCase2.authentication=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJBbmRyb2lkIiwib3N2IjoiU25vdyBDb25lIiwiYXBwdiI6IjEuMC4wYSIsInVzZXJuYW1lIjoiZ2VuZXJpY1VzZXIyIiwicGFzc3dvcmQiOiJwYXNzd29yZDQzMjEhIn0.ptybNtXndDaUfzCMOHfFPrgLfhjFOIrSOHWxq0UieM0"`
var testCase3 = {}
testCase3.username='"genericUser3"'
testCase3.password='"password1423"'
testCase3.header=testCase1.header
testCase3.payload=`{"dev":"Android","osv":"Tiramisu","appv":"1.0.0a", "username":${testCase3.username},"password":${testCase3.password}}`
testCase3.authentication=`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJBbmRyb2lkIiwib3N2IjoiVGlyYW1pc3UiLCJhcHB2IjoiMS4wLjBhIiwidXNlcm5hbWUiOiJnZW5lcmljVXNlcjMiLCJwYXNzd29yZCI6InBhc3N3b3JkMTQyMyJ9.0GIvcX1kMiuHDJ4NZRlTbnkcAZTruQFkkdOhZTOcjpM"`

var chosenTestCase = testCase1;
console.log("chosen Test", chosenTestCase)
var executeTest = "logout"

//////////////////////////////////////////////////////
////// CURL COMMANDS
//////////////////////////////////////////////////////
var curlBasePost='curl -X POST -H "Content-Type: application/json" -d'
var createUserCurl = `${curlBasePost} '{"header":${chosenTestCase.header},"payload":${chosenTestCase.payload}}' ${urlBase}/create-user-request`
var loginUserCurl = `${curlBasePost} '{"header":${chosenTestCase.header},"payload":${chosenTestCase.payload}}' ${urlBase}/login-user-request`
var logoutUserCurl = `${curlBasePost} '{"username":${chosenTestCase.username}, "password":${chosenTestCase.password}, "authentication":${chosenTestCase.authentication}}' ${urlBase}/logout-user-request`


//////////////////////////////////////////////////////
////// UNIT TESTS STARTT HERE
//////////////////////////////////////////////////////


if (executeTest == "create") 
{
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

}
else if (executeTest == "login") 
{
    // loginUserUnitTest
    exec(loginUserCurl)
    .then(result => {
        try 
        {
            var o = JSON.parse(result.stdout)
            if (typeof o == "object" && "authentication" in o)
                console.log(fgGreen,"LogInUserUnitTest SUCCESS : response : \n",resetColor, o)
            else if (typeof o == "string" && o == `Error handling request - Username does not exist`)
                console.log(fgGreen, "LogInUserUnitTest SUCCESS : response :", resetColor, o )
        } catch (error) {
            console.log(fgRed, "LogInUserUnitTest FAILED: error : ", resetColor, error, result)
        }

    }, err => {console.log(err)})

}
else if (executeTest == "logout")
{
    // logoutUserUnitTest
    exec(logoutUserCurl)
    .then(result => {
        try 
        {
            var o = JSON.parse(result.stdout)
            if (typeof o == "object" && "stdout" in o)
                console.log(fgGreen,"LogoutUserUnitTest SUCCESS : response : \n",resetColor, o)
            else if (typeof o == "string")
                if (o == `Logged out` || 
                    o == `Error handling request - Username does not exist` || 
                    o == `Error handling request - Token invalid.`||
                    o == "Logout failed - Invalid password")
                {
                    console.log(fgGreen, "LogoutUserUnitTest SUCCESS : response :", resetColor, o )
                }
        } catch (error) {
            console.log(fgRed, "LogoutUserUnitTest FAILED: error : ", resetColor, error, result)
        }
    }, err => {console.log(err)})
}



// AUTHENTICATION IS STILL INVALID AFTER LOGGING IN