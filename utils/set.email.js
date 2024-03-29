const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(mailOptions) {
    //create reusable transporter object using yhe default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
    from: mailOptions.from, 
    to: mailOptions.to, 
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html,
  });

  console.log("Email sent successful");
}

module.exports = sendEmail