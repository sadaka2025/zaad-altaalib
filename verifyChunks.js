// verifyChunksFinal.js
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// ---- CONFIG ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ---- Paramètres ----
const tableName = 'pdf_chunks'; // nom exact de ta table
const textCol = 'content'; // colonne texte
const limitChunks = 50; // combien de chunks à vérifier

async function verifyChunks() {
  try {
    // 🔹 Récupération des chunks
    const { data: chunks, error } = await supabase
      .from(tableName)
      .select(`id, ${textCol}`)
      .limit(limitChunks);

    if (error) {
      console.error('Erreur lors de la récupération des chunks:', error);
      return;
    }

    console.log(`✅ Chunks récupérés: ${chunks.length}\n`);

    let emptyCount = 0;

    chunks.forEach((chunk, index) => {
      const text = chunk[textCol];
      if (!text || text.trim() === '') {
        console.log(`Chunk #${index + 1} (ID: ${chunk.id}) est vide!`);
        emptyCount++;
      } else {
        console.log(`Chunk #${index + 1} (ID: ${chunk.id}) contient du texte.`);
        console.log(`Aperçu: ${text.slice(0, 100).replace(/\n/g, ' ')}...\n`);
      }
    });

    console.log(`\nTotal chunks vides: ${emptyCount}`);
  } catch (err) {
    console.error('Erreur inattendue:', err);
  }
}

// 🔹 Exécution
verifyChunks();
