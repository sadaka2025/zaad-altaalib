// upload-media.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mime from 'mime-types'; // npm install mime-types

// 🔑 Service Role (⚠️ jamais côté frontend)
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk';

const BUCKET = 'videos'; // 👈 ou crée un bucket séparé "media"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 📂 Dossier local à parcourir
const localDir = path.join(process.cwd(), 'public', 'videos');

async function uploadAllMedia() {
  // Extensions vidéo & audio supportées
  const files = glob.sync('**/*.{mp4,webm,avi,mov,mkv,mp3,wav,ogg,m4a}', {
    cwd: localDir,
  });

  if (files.length === 0) {
    console.log('⚠️ Aucun fichier média trouvé dans', localDir);
    return;
  }

  console.log(`📂 ${files.length} fichiers média trouvés.`);

  for (const relativePath of files) {
    const fullPath = path.join(localDir, relativePath);
    const fileBuffer = fs.readFileSync(fullPath);

    // Détection automatique du contentType (audio/mp3, video/mp4…)
    const contentType = mime.lookup(fullPath) || 'application/octet-stream';

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(relativePath, fileBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType,
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

  console.log('🎉 Tous les fichiers média ont été uploadés !');
  await checkBucketContents();
}

async function checkBucketContents() {
  console.log(`🔎 Vérification du bucket '${BUCKET}'...`);

  const { data, error } = await supabase.storage.from(BUCKET).list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error('❌ Erreur check bucket:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log(`📂 Le bucket '${BUCKET}' est VIDE !`);
  } else {
    console.log(`📂 ${data.length} fichiers trouvés dans le bucket :`);
    data.forEach((file) => console.log('   - ' + file.name));
  }
}

// 🚀 Lance l’upload
uploadAllMedia();
