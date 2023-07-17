const nodemailer = require('nodemailer')


const mailConfig = 
{
    service:'gmail',
    auth:
    {
        user: '',
        password: ''
    }
}

const transporter = nodemailer.createTransport(mailConfig);


var mailOptions = 
{
    from: '',
    to: '',
    subject: '',
    text: ''
}


transporter.sendMail(mailOptions, (err, info) => {
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log("Email sent: ", info.response)
    }
});

const mailerService = {}

module.exports = mailerService;