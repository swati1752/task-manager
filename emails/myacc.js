const sgMail = require('@sendgrid/mail')
require ('dotenv').config()

sgMail.setApiKey(process.env.SECRET_API_KEY)

const sendWelcomeEmail = (email , name) => {
    sgMail.send({
        to:email,
        from: 'swasti1752@gmail.com',
        subject: "Welcome",
        text: `Hello ${name} , this is a  confirmation email that you have logged in!`
    })
}

const sendDelEmail = (email , name) =>{
    sgMail.send({
        to: email,
        from: 'swasti1752@gmail.com',
        subject:`GoodBye ${name}`,
        text:`We respect your decision , hope to serve you soon in future`
    })
}

module.exports = { sendWelcomeEmail , sendDelEmail}