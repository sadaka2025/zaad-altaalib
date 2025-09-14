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

// 🔹 Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 🔹 Connexion Cohere
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

// 🔹 Correction complète du texte arabe inversé (dernière version)
function fixArabicSentence(text) {
  if (!text) return '';

  const stopWords = ['عمجم', 'سورد', 'ب'];

  // Nettoyage général
  let clean = text
    .replace(/\u202B|\u202C|\u202A|\u200F|\u200E/g, '')
    .replace(/[{}\[\]—\-–()<>]/g, '')
    .replace(/[.,;:،ـ…!؟]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Découper en mots
  let words = clean.split(' ').filter(Boolean);

  // Détecter les suffixes fixes comme "مجمع الدروس"
  let suffixIndex = words.findIndex(
    (w, i) => w === 'مجمع' && words[i + 1] === 'الدروس'
  );
  let mainPhrase, suffix;
  if (suffixIndex >= 0) {
    mainPhrase = words.slice(0, suffixIndex);
    suffix = words.slice(suffixIndex, suffixIndex + 2);
  } else {
    mainPhrase = words;
    suffix = [];
  }

  // Supprimer mots parasites
  mainPhrase = mainPhrase.filter((w) => !stopWords.includes(w));

  // Inverser la phrase principale
  mainPhrase = mainPhrase.reverse();

  // Recomposer la phrase finale
  let finalText = mainPhrase.join(' ');
  if (suffix.length) finalText += '. ' + suffix.join(' ');

  return finalText;
}

// 🔹 Route principale API
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ error: '❌ Question manquante' });

    const fixedQuestion = fixArabicSentence(question);

    // 1️⃣ Générer embedding
    const embeddingRes = await cohere.embed({
      model: EMBEDDING_MODEL,
      texts: [fixedQuestion],
      input_type: 'search_query',
    });
    const queryEmbedding = embeddingRes.embeddings[0];

    // 2️⃣ Recherche contextuelle Supabase
    const { data, error } = await supabase.rpc('match_pdf_chunks', {
      query_embedding: queryEmbedding,
      match_count: 5,
    });

    if (error) {
      console.error('❌ Supabase RPC error:', error);
      return res
        .status(500)
        .json({ error: 'Supabase RPC error', details: error });
    }

    const context =
      data.map((c) => `(chunk ${c.chunk_id}) ${c.content}`).join('\n\n') ||
      '(pas de contexte trouvé)';

    // 3️⃣ Génération réponse ciblée par Cohere
    const genRes = await cohere.generate({
      model: 'command-r-plus',
      prompt: `
أنت مساعد ذكي متخصص في التعليم الإسلامي.
مهمتك:
- إذا كان السؤال على شكل "اختيارات متعددة" (QCM)، أجب فقط بالحرف (أ، ب، ج، د) الصحيح، ثم اذكر المصدر (مثال: "ب. تجوز إمامته إذا حسنت توبته — [مجمع الدروس]"). 
- لا تكتب شرحًا إضافيًا ولا نصًا خارج الخيارات.
- إذا كان السؤال صواب أو خطأ، أجب بكلمة "صواب" أو "خطأ" فقط مع ذكر المصدر.
- إذا كان السؤال ملء فراغ، أجب بالنص مكتملاً كما هو مع إضافة المصدر.

السؤال:
${fixedQuestion}

النصوص المستخرجة (مع مصدرها):
${context}

تذكر: الجواب يجب أن يكون مختصرًا (حرف الخيار أو الكلمة) مع ذكر المصدر فقط.
      `,
      max_tokens: 200,
    });

    const finalAnswer = genRes.generations[0].text.trim();

    // 4️⃣ Retour JSON
    return res.json({
      answer: finalAnswer,
      chunks: data.map((c) => ({
        chunk_id: c.chunk_id,
        content: c.content,
        similarity: c.similarity,
      })),
    });
  } catch (err) {
    console.error('❌ Generation error:', err);
    return res.status(500).json({
      error: 'Generation error',
      details: err.message,
    });
  }
});

// 🔹 Lancer le serveur
app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
