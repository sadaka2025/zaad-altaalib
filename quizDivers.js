// quizDivers.js
// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// ---- CONFIG ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

// ---- Charger le JSON multi-semestre (optionnel) ----
const semestersFile = path.resolve(
  'public/dataquiz/years/year1/semesters.json'
);
let semesters = [];
if (fs.existsSync(semestersFile)) {
  semesters = JSON.parse(fs.readFileSync(semestersFile, 'utf-8'));
  console.log(
    `✅ Semesters chargés: ${semesters.map((s) => s.name).join(', ')}`
  );
} else {
  console.warn(
    '⚠️ semesters.json non trouvé, les matières/sources ne seront pas listées'
  );
}

// ---- Fonction pour poser une question ----
async function ask(question, matchCount = 5) {
  console.log(`❓ Question: ${question}`);

  // 1) Embedding de la question
  const embedRes = await cohere.embed({
    model: EMBEDDING_MODEL,
    texts: [question],
    input_type: 'search_query',
  });

  const queryEmbedding = embedRes.embeddings[0];

  // 2) Recherche dans Supabase via match_pdf_chunks
  const { data, error } = await supabase.rpc('match_pdf_chunks', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    console.error('❌ Erreur recherche Supabase:', error);
    return;
  }

  // 3) Construire le contexte
  const context = data
    .map((d) => `(chunk ${d.chunk_id}) ${d.content}`)
    .join('\n\n');

  // 4) Générer la réponse ciblée
  const genRes = await cohere.generate({
    model: 'command-r-plus',
    prompt: `
أنت مساعد ذكي متخصص في التعليم الإسلامي.
مهمتك:
- إذا كان السؤال على شكل "اختيارات متعددة" (QCM)، أجب فقط بالحرف (أ، ب، ج، د) الصحيح، ثم اذكر المصدر (مثال: "ب. تجوز إمامته إذا حسنت توبته — [مجمع دروس]").
- لا تكتب شرحًا إضافيًا ولا نصًا خارج الخيارات.
- إذا كان السؤال صواب أو خطأ، أجب بكلمة "صواب" أو "خطأ" فقط مع المصدر.
- إذا كان السؤال ملء فراغ، أجب بالنص مكتملاً كما هو مع إضافة المصدر.

السؤال:
${question}

النصوص المستخرجة (مع مصدرها):
${context}

تذكر: الجواب يجب أن يكون حرف الخيار الصحيح فقط مع المصدر.
    `,
    max_tokens: 200,
  });

  console.log('👉 Réponse:', genRes.generations[0].text.trim());
}

// ---- Mode CLI ----
const mode = process.argv[2];

if (mode === 'ask') {
  const question = process.argv.slice(3).join(' ');
  if (!question) {
    console.log('Usage: node quizDivers.js ask "سؤال" ');
  } else {
    ask(question);
  }
} else {
  console.log('Usage:');
  console.log('  node quizDivers.js ask "سؤال"  # pour poser une question');
}
