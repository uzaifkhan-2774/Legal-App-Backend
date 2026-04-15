
import nodemailer from "nodemailer";
const userMail = process.env.USER_MAIL;
const passKey = process.env.PASS_KEY;

const Mailsender = function(to, subject, text, htmlTemplate){

 const Transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : userMail,
        pass : passKey
    }
 })

 const mailOptions = {
    from :"uzaifkhan248@gmail.com",
    to,
    subject,
    text, 
    htmlTemplate
 }

   Transporter.sendMail(mailOptions)

}

export default Mailsender;
