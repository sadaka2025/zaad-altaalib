// scripts/empty_pdfs_bucket.js
import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

// ⚠️ Mets ton URL et ta SERVICE_ROLE_KEY ici
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// bucket à vider (par défaut "pdf")
const BUCKET = process.argv[2] || 'pdf';

// confirmation utilisateur
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'oui' || answer.toLowerCase() === 'y');
    });
  });
}

async function emptyBucket() {
  try {
    const confirmed = await askConfirmation(
      `⚠️ Tu es sur le point de SUPPRIMER TOUS les fichiers dans le bucket "${BUCKET}".\nVeux-tu continuer ? (oui/non) `
    );

    if (!confirmed) {
      console.log('❌ Suppression annulée.');
      return;
    }

    // fonction récursive pour lister tous les fichiers
    async function listRecursive(prefix = '') {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(prefix, { limit: 1000 });
      if (error) throw error;

      let files = [];
      for (const item of data) {
        if (item.name.endsWith('/')) {
          files = files.concat(await listRecursive(`${prefix}${item.name}`));
        } else {
          files.push(prefix + item.name);
        }
      }
      return files;
    }

    const files = await listRecursive();
    if (files.length > 0) {
      console.log(
        `Suppression de ${files.length} fichiers dans "${BUCKET}"...`
      );
      const { error: delError } = await supabase.storage
        .from(BUCKET)
        .remove(files);
      if (delError) throw delError;
      console.log(`✅ Tous les fichiers supprimés.`);
    } else {
      console.log(`✅ Bucket "${BUCKET}" est déjà vide.`);
    }
  } catch (err) {
    console.error('Erreur:', err.message);
  }
}

emptyBucket();
