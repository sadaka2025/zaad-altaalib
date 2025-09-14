// api/chat.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();
app.use(express.json());

// Env variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ utiliser service_role_key car besoin insert/select embeddings
);

app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;

    // 1) Obtenir l'embedding de la question avec Cohere
    const embRes = await fetch('https://api.cohere.ai/v1/embed', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts: [question],
        model: 'embed-english-v3.0', // ou un autre modèle Cohere
      }),
    });
    const embData = await embRes.json();
    const queryEmbedding = embData.embeddings[0];

    // 2) Requête Supabase → match_pdf_chunks
    const { data, error } = await supabase.rpc('match_pdf_chunks', {
      query_embedding: queryEmbedding,
      match_count: 5,
    });
    if (error) throw error;

    // 3) Construire une réponse simple (concat des chunks trouvés)
    const context = data.map((d) => d.content).join('\n---\n');

    // 4) Appeler Cohere generate pour fabriquer une réponse finale
    const genRes = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus', // modèle génération cohérente
        prompt: `Réponds à la question en te basant uniquement sur ce contexte:\n${context}\n\nQuestion: ${question}\nRéponse:`,
      }),
    });
    const genData = await genRes.json();

    res.json({ answer: genData.generations[0].text.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
