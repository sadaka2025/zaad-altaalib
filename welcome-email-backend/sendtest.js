const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cformation75@gmail.com",
    pass: "whzv pvjd zosq xhbo",
  },
});

const mailOptions = {
  from: "ton.email@gmail.com",
  to: "destinataire@example.com",
  subject: "Test Email",
  text: "Ceci est un test.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Email envoyé: " + info.response);
});
