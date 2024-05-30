const express = require("express");
const expressAsyncHandler = require("express-async-handler")
const router = new express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });
const sendEmail = expressAsyncHandler(async (req,res)=>{
    try{
    const {name, email, subject, message} = req.body;
    // var mailOptions = {
    //     from: process.env.SMTP_MAIL,
    //     to:'sheetaldhingra09@gmail.com',
    //     subject:subject,
    //     html:message
    // }
    // transporter.sendMail(mailOptions, function(error,info){
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         console.log("Email sent successfully");
    //         res.status(201).json({status:201,info})
    //     }
    // })
    // mailOptions = {
    //     from: process.env.SMTP_MAIL,
    //     to:'sheetaldhingra09@gmail.com',
    //     subject:subject,
    //     html:message
    // }
    // transporter.sendMail(mailOptions, function(error,info){
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         console.log("Email sent successfully");
    //         res.status(201).json({status:201,info})
    //     }
    // })
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to:'sheetaldhingra09@gmail.com',
        subject:subject,
        html:message
    }
    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent successfully");
            res.status(201).json({status:201,info})
        }
    })
    const htmlEmail = `
  <html>
    <head>
      <style>
        /* Inline CSS styles */
        body {
          font-family: "Poppins", Sans-serif;
          line-height: 1.5;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 4px;
          border: 1px solid #e9e9e9;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .thank-you {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .details {
          margin-bottom: 20px;
        }

        .contact-info {
          font-weight: bold;
        }

        .closing {
          font-style: italic;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank you for your inquiry!</h1>
        </div>
        <div class="thank-you">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to CodeBuzzz Studio through our website. We greatly appreciate your interest in our products/services and the opportunity to assist you.</p>
        </div>
        <div class="details">
          <p>Our team is excited to help address your query and provide you with the information you need. We are currently reviewing your request and will respond promptly with the relevant details.</p>
          <p>As a customer-focused company, we understand the importance of a timely response. Rest assured, we will get back to you within 24-48 hrs with a comprehensive solution tailored to your needs.</p>
        </div>
        <div class="closing">
          <p>Thank you again for considering CodeBuzzz Studio. We look forward to the possibility of working with you and exceeding your expectations.</p>
          <p>Best regards,</p>
          <p>CodeBuzzz Studio</p>
        </div>
      </div>
    </body>
  </html>
`;
    var CustomermailOptions = {
        from: process.env.SMTP_MAIL,
        to:email,
        subject:"Thank you for your inquiry!",
        html:htmlEmail
    }
    transporter.sendMail(CustomermailOptions, function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent successfully");
            res.status(201).json({status:201,info})
        }
    })
}
catch(error){
    res.status(201).json({status:401,error})
}
})
router.post("/email/sendEmail",sendEmail)

module.exports = {sendEmail};