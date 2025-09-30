import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

// Configure ton compte email Gmail avec mot de passe d'application
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cformation75@gmail.com',
    pass: 'gajf kmdi qfoo vxsb', // mot de passe application
  },
});

app.post('/send-question', async (req, res) => {
  const { title, content, email, subject } = req.body;

  if (!title || !content || !email || !subject) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    await transporter.sendMail({
      from: `"Formulaire Questions" <cformation75@gmail.com>`,
      to: 'cformation75@gmail.com',
      subject: `Nouvelle question sur ${subject}`,
      text: `Titre: ${title}\nContenu: ${content}\nEmail de contact: ${email}`,
      html: `<p><strong>Titre:</strong> ${title}</p>
             <p><strong>Contenu:</strong> ${content}</p>
             <p><strong>Email:</strong> ${email}</p>`,
    });

    res.json({ success: true, message: 'Email envoyé !' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’envoi de l’email' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
