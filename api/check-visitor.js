import fs from "fs";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email } = req.body;
  const lowerEmail = email.toLowerCase();

  // Charger les fichiers JSON
  const allowed = JSON.parse(fs.readFileSync("allowedEmails.json", "utf8"));
  const blocked = JSON.parse(fs.readFileSync("blockedEmails.json", "utf8"));

  // Récupérer IP du visiteur
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "IP inconnue";

  // Envoi notification admin pour nouveaux visiteurs non connus
  if (!allowed.includes(lowerEmail) && !blocked.includes(lowerEmail)) {
    await sendEmailToAdmin({ email: lowerEmail, ip });
  }

  // Réponse au frontend
  if (blocked.includes(lowerEmail))
    return res.status(200).json({ blocked: true });
  if (allowed.includes(lowerEmail))
    return res.status(200).json({ allowed: true });
  return res.status(200).json({ allowed: false, blocked: false });
}

async function sendEmailToAdmin(visitor) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "Nouveau visiteur détecté",
    text: `Email: ${visitor.email}\nIP: ${visitor.ip}`,
  });
}
