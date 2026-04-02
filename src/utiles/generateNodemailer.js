
import nodemailer from "nodemailer";

const Mailsender = function(to, subject, text, htmlTemplate){

 const Transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "uzaifkhan248@gmail.com",
        pass : "sqkp czxb yzch upqn"
    }
 })

 const mailOptions = {
    from : "uzaifkhan248@gmail.com",
    to,
    subject,
    text, 
    htmlTemplate
 }

   Transporter.sendMail(mailOptions)

}

export default Mailsender;
