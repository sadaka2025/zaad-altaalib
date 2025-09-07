// sync-pdfs.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import glob from 'glob';

// ⚠️ Service Role Key (ne jamais exposer côté frontend)
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk';

const BUCKET = 'pdf';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 📂 Dossier local
const localDir = path.join(process.cwd(), 'public', 'PDFs');

async function syncBucket() {
  // 1. Fichiers locaux
  const files = glob.sync('**/*.pdf', { cwd: localDir });
  const localPaths = files.map((f) => f.replace(/\\/g, '/')); // Windows fix

  console.log(`📂 ${localPaths.length} fichiers PDF trouvés localement.`);

  // 2. Fichiers distants
  const { data: remoteFiles, error: listError } = await supabase.storage
    .from(BUCKET)
    .list('', { limit: 1000, recursive: true });

  if (listError) {
    console.error('❌ Erreur lors du listing:', listError.message);
    return;
  }

  const remotePaths = (remoteFiles || []).map((f) => f.name);

  // 3. Supprimer ceux qui n'existent plus localement
  const toDelete = remotePaths.filter((p) => !localPaths.includes(p));
  if (toDelete.length > 0) {
    console.log('🗑️ Suppression des fichiers absents localement:', toDelete);
    await supabase.storage.from(BUCKET).remove(toDelete);
  }

  // 4. Upload avec upsert
  for (const relativePath of localPaths) {
    const fullPath = path.join(localDir, relativePath);
    const fileBuffer = fs.readFileSync(fullPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(relativePath, fileBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'application/pdf',
      });

    if (error) {
      console.error(`❌ Erreur upload ${relativePath}:`, error.message);
    } else {
      const { data: publicUrl } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(relativePath);
      console.log(`✅ Uploadé: ${relativePath}`);
      console.log(`🔗 URL publique: ${publicUrl.publicUrl}\n`);
    }
  }

  // 5. Vérification finale
  const { data: finalList } = await supabase.storage.from(BUCKET).list('', {
    limit: 1000,
    recursive: true,
  });

  console.log(
    `🎉 Synchronisation terminée ! ${finalList?.length || 0} fichiers dans le bucket.`
  );
  finalList?.forEach((file) => console.log('   - ' + file.name));
}

syncBucket();
