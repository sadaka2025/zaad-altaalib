// testQuery.js
import 'dotenv/config';
import { CohereClient } from 'cohere-ai';
import pkg from '@supabase/supabase-js';

const { createClient } = pkg;

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const question = process.argv[2] || 'ما هو حكم التيمم؟';
  console.log('❓ Question originale :', question);

  // ---- Embedding de la question ----
  const embeddingResponse = await cohere.embed({
    model: process.env.EMBEDDING_MODEL, // ex: "embed-multilingual-light-v3.0"
    texts: [question],
  });

  const queryEmbedding = embeddingResponse.embeddings[0];
  console.log('📐 Dimension embedding :', queryEmbedding.length);
  console.log('🔎 Aperçu embedding :', queryEmbedding.slice(0, 8));

  // ---- Recherche dans Supabase ----
  const { data, error } = await supabase.rpc('match_pdf_chunks', {
    query_embedding: queryEmbedding,
    match_count: 5,
  });

  if (error) {
    console.error('❌ Erreur Supabase:', error);
    return;
  }

  console.log('📚 Résultats similaires :');
  data.forEach((row, i) => {
    console.log(
      `#${i + 1} | Score: ${row.similarity.toFixed(3)} | Aperçu: ${row.content.substring(0, 80)}...`
    );
  });
}

main().catch(console.error);
