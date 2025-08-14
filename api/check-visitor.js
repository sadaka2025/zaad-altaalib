import allowedEmails from "./data/allowedEmails.json";
import blockedEmails from "./data/blockedEmails.json";

export default function handler(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email manquant" });

  if (blockedEmails.includes(email))
    return res.status(200).json({ blocked: true });
  if (allowedEmails.includes(email))
    return res.status(200).json({ allowed: true });

  return res.status(200).json({ allowed: false, blocked: false });
}
