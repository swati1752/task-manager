const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, 
    service:'gmail',
    auth: {
      user: process.env.SENDER_EMAIL, 
      pass: process.env.SENDER_PASS, 
      authentication:'plain'
    },
    tls : {
        rejectUnauthorized:false
    }
  });



const sendWelcomeEmail = async(email , name) => {
    await transporter.sendMail({
        to:email,
        from: 'swasti1752@gmail.com',
        subject: "Welcome",
        text: `Hello ${name} , this is a  confirmation email that you have logged in!`
    })
}

const sendDelEmail = async (email , name) =>{
    await transporter.sendMail({
        to: email,
        from: 'swasti1752@gmail.com',
        subject:`GoodBye ${name}`,
        text:`We respect your decision , hope to serve you soon in future`
    })
}

module.exports = { sendWelcomeEmail , sendDelEmail}