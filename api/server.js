// api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

// 🔹 Correction arabe
function fixArabicText(text) {
  return text
    .split(/\s+/)
    .map((word) => word.split('').reverse().join(''))
    .join(' ');
}

// POST /api/ask
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question manquante' });

    const fixedQuestion = fixArabicText(question);

    const embeddingRes = await cohere.embed({
      model: EMBEDDING_MODEL,
      texts: [fixedQuestion],
      input_type: 'search_query',
    });

    const queryEmbedding = embeddingRes.embeddings[0];

    const { data, error } = await supabase.rpc('match_pdf_chunks', {
      query_embedding: queryEmbedding,
      match_count: 5,
    });

    if (error)
      return res
        .status(500)
        .json({ error: 'Supabase RPC error', details: error });

    const answerText =
      data.map((c) => c.content).join('\n---\n') || '(pas de réponse)';

    return res.json({
      answer: answerText,
      chunks: data.map((c) => ({ content: c.content, score: c.score ?? null })),
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Generation error', details: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
