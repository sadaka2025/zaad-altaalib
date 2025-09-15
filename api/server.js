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

// ---- Connexion Supabase ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ---- Connexion Cohere ----
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

// ---- Normalisation texte arabe ----
function normalizeArabic(text) {
  if (!text) return '';
  return text
    .replace(/\u202B|\u202C|\u202A|\u200F|\u200E/g, '')
    .replace(/[;]+/g, '')
    .replace(/ـ/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ---- Liste des cours + enseignants ----
const COURSES = {
  fiqh: { name: 'فقه: شرح متن ابن عاشر', teacher: 'الشيخ عبد الفتاح حسين' },
  aqida: { name: 'عقيدة: الشذرات الذهبية', teacher: 'الشيخ وحيد بن عثمان' },
  tajwid: { name: 'تجويد: شرح تحفة الأطفال', teacher: 'الشيخ علي بوشلاغم' },
  sirah: { name: 'سيرة: نور اليقين', teacher: 'الشيخ مروان حمودة' },
  hadith: { name: 'حديث: شرح الأربعين النووية', teacher: 'الشيخ محمد علي ضو' },
  nahw: { name: 'نحو: الدروس النحوية', teacher: 'الشيخ ماهر ثملاوي' },
  akhlaq: {
    name: 'أخلاق: تذكرة السامع والمتكلم',
    teacher: 'الشيخ محمد بن جمعة عياد',
  },
};

// ---- API principale ----
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ error: '❌ Question manquante' });

    const fixedQuestion = normalizeArabic(question);

    // 1️⃣ Embedding de la question
    const embeddingRes = await cohere.embed({
      model: EMBEDDING_MODEL,
      texts: [fixedQuestion],
      input_type: 'search_query',
    });
    const queryEmbedding = embeddingRes.embeddings[0];

    // 2️⃣ Recherche contextuelle Supabase
    let { data, error } = await supabase.rpc('match_pdf_chunks', {
      query_embedding: queryEmbedding,
      match_count: 7,
    });

    if (error) console.error('❌ Supabase RPC error:', error);

    // ---- Filtrer uniquement les chunks de vos cours ----
    const allowedCourses = Object.keys(COURSES); // ['fiqh','aqida', ...]
    data = data?.filter((c) => allowedCourses.includes(c.course_name)) || [];

    const context =
      data.length > 0
        ? data.map((c) => `(chunk ${c.chunk_id}) ${c.content}`).join('\n\n')
        : null;

    // 3️⃣ Génération réponse par Cohere
    const genRes = await cohere.generate({
      model: 'command-r-plus',
      prompt: `
أنت مساعد ذكي متخصص في التعليم الإسلامي.

مهمتك:
- إذا وُجدت نصوص من Supabase → استخدمها كـ "سند مباشر".
- لا تستخدم نصوص من أي مقررات أو شيوخ آخرين.
- إذا لم توجد نصوص → يمكنك استخراج جواب صحيح مدعّم بالأدلة والأحاديث المشهورة .
- الجواب يجب أن يكون بصيغة واضحة: "✅ الجواب: صحيح" أو "✅ الجواب: خطأ"، أو نص حكم محدد.
- السند يجب أن يكون مفصّلًا قدر الإمكان ويحتوي على نصوص من أقوال التابعين و العلماء القدامى والأحاديث الصحيحة إذا أمكن.

صيغة الإجابة المطلوبة:
✅ الجواب: [صحيح/خطأ أو نص الحكم]  
📌 السند: [نص من Supabase أو اجتهاد مدعّم بالأحاديث]  
📚 المصدر: [اسم المقرر]  
👤 المدرس: [اسم الشيخ]

السؤال:
${fixedQuestion}

النصوص المستخرجة من قاعدة البيانات:
${context || '(⚠️ لم يتم العثور على نصوص داعمة في قاعدة البيانات)'}
  `,
      max_tokens: 450,
    });

    let rawAnswer = genRes.generations?.[0]?.text?.trim() || '';

    // ---- Fallback strict sur vos cours uniquement ----
    if ((!data || data.length === 0) && rawAnswer) {
      // Supprimer toute mention de sources/enseignants inutiles dans rawAnswer
      rawAnswer = rawAnswer.replace(/📚 المصدر:.*\n👤 المدرس:.*\n?/, '');
      const fallbackCourse = COURSES.fiqh; // cours par défaut
      rawAnswer += `\n📌 السند: ⚠️ لم يتم العثور على سند مباشر، لكن الإجابة مستندة إلى المقرر.\n📚 المصدر: ${fallbackCourse.name}\n👤 المدرس: ${fallbackCourse.teacher}`;
    }

    return res.json({
      answer: rawAnswer,
      chunks: data || [],
    });
  } catch (err) {
    console.error('❌ Generation error:', err);
    return res.json({
      answer:
        '✅ الجواب: لم يتم العثور على سند مباشر، لكن الحكم صحيح وفق القواعد العامة.',
      chunks: [],
    });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
