//indexerMatiere.js
// @ts-nocheck
import fetch from 'node-fetch';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import { createClient } from '@supabase/supabase-js';
import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL || 'embed-multilingual-light-v3.0';

// ---- Charger semesters.json ----
const semestersFile = path.resolve(
  'public/dataquiz/years/year1/semesters.json'
);
const semesters = JSON.parse(fs.readFileSync(semestersFile, 'utf-8'));

// ---- Fonctions utilitaires ----
async function extractText(buffer) {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item) => item.str).join(' ') + '\n\n';
  }
  return fullText;
}

function chunkText(text, chunkSize = 500) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  return chunks;
}

function generateChunkId(semester, matiere, source, index) {
  return crypto
    .createHash('md5')
    .update(`${semester}|${matiere}|${source}|${index}`)
    .digest('hex');
}

async function getIndexedChunkIds(semester, matiere, sourceName) {
  const { data, error } = await supabase
    .from('pdf_chunks')
    .select('chunk_id')
    .eq('semester', semester)
    .eq('matiere', matiere)
    .eq('source', sourceName);

  if (error) {
    console.error('❌ Supabase fetch error:', error);
    return [];
  }
  return data.map((d) => d.chunk_id);
}

// ---- Indexation par matière ----
async function indexMatiere(matiereArg) {
  for (const semester of semesters) {
    for (const matiere of semester.matieres) {
      if (matiere.name !== matiereArg) continue; // ignorer les autres matières

      for (const source of matiere.sources) {
        try {
          console.log(
            `► Vérification PDF: ${matiere.name} (${source.source}) - ${semester.name}`
          );

          const existingChunkIds = await getIndexedChunkIds(
            semester.name,
            matiere.name,
            source.source
          );

          const res = await fetch(source.url);
          if (!res.ok) throw new Error(`Erreur download: ${res.status}`);
          const buffer = Buffer.from(await res.arrayBuffer());

          const text = await extractText(buffer);
          const chunks = chunkText(text, 500);

          const chunksToIndex = chunks
            .map((chunk, idx) => ({
              chunk,
              id: generateChunkId(
                semester.name,
                matiere.name,
                source.source,
                idx
              ),
            }))
            .filter(({ id }) => !existingChunkIds.includes(id));

          console.log(
            `✔ Total chunks: ${chunks.length}, à indexer: ${chunksToIndex.length}`
          );

          for (const { chunk, id } of chunksToIndex) {
            try {
              const embeddingRes = await cohere.embed({
                model: EMBEDDING_MODEL,
                texts: [chunk],
                input_type: 'search_document',
              });

              const embedding = embeddingRes.embeddings[0];

              const { error } = await supabase.from('pdf_chunks').insert({
                chunk_id: id,
                content: chunk,
                embedding: embedding,
                semester: semester.name,
                matiere: matiere.name,
                source: source.source,
              });

              if (error) console.error('❌ Supabase insert error:', error);
              else console.log(`✔ Chunk inséré (${source.source})`);
            } catch (err) {
              console.error('X Erreur embedding pour ce chunk:', err);
            }
          }
        } catch (err) {
          console.error('✖ Erreur générale:', err);
        }
      }
    }
  }

  console.log(`✅ Indexation terminée pour la matière: ${matiereArg}`);
}

// ---- CLI ----
const matiereArg = process.argv[2];
if (!matiereArg) {
  console.log('Usage: node indexerMatiere.js <matiere>');
  process.exit(1);
}

indexMatiere(matiereArg);
