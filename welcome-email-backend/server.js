const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// Configure ici avec ton compte Gmail et mot de passe d'application
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com", // ton email Gmail
    pass: "ton_mot_de_passe_application", // mot de passe d'application Gmail
  },
});

app.post("/send-welcome", async (req, res) => {
  const { email } = req.body;
  console.log("Demande d'envoi email à :", email);

  const mailOptions = {
    from: "ton.email@gmail.com",
    to: email,
    subject: "Bienvenue sur notre site",
    text: "Merci pour votre inscription !",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé à :", email);
    res.status(200).send("Email envoyé");
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).send("Erreur lors de l'envoi de l'email");
  }
});

app.listen(3001, () => {
  console.log("Serveur backend lancé sur http://localhost:3001");
});
