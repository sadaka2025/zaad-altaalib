// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

// ---- CONFIG ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

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

  // 2) Recherche dans Supabase (matchCount résultats)
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    console.error('❌ Erreur recherche Supabase:', error);
    return;
  }

  // 3) Construire le contexte avec source, matière et semestre
  const context = data
    .map((d) => `(${d.semester} - ${d.matiere} - ${d.source}) ${d.content}`)
    .join('\n\n');

  // 4) Générer la réponse ciblée
  const genRes = await cohere.generate({
    model: 'command-r-plus',
    prompt: `
أنت مساعد ذكي متخصص في التعليم الإسلامي.
عليك أن تجيب على الأسئلة بصيغة واضحة ومباشرة، مع الإشارة إلى مصدر الجواب من بين:
1. مجمع دروس
2. الملتقى الأول والثاني والثالث
3. الكتاب المصاحب

أنواع الأسئلة المحتملة:
- سؤال متعدد الخيارات (QCM): اختر الجواب الصحيح فقط، ثم أضف المصدر.
- سؤال بصواب أو خطأ: أجب "صواب" أو "خطأ" مع المصدر.
- سؤال ملء فراغ: أعد كتابة النص كامل مع الكلمات المناسبة في مكانها، ثم أضف المصدر.

السؤال:
${question}

النصوص المستخرجة (مع مصدرها):
${context}

أجب بدقة فقط حسب ما ورد في المصادر.
    `,
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
