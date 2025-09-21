// scripts/upload-emails.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// 🔑 Service Role Key
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk';

const BUCKET = 'allowed_emails';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 📂 fichiers locaux
const localDir = path.join(process.cwd(), 'public', 'dataemail');
const files = ['allowedEmails.json', 'blockedEmails.json'];

async function uploadEmails() {
  for (const file of files) {
    const fullPath = path.join(localDir, file);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ Fichier introuvable: ${fullPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(fullPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(`public/dataemail/${file}`, fileBuffer, {
        upsert: true,
        contentType: 'application/json',
      });

    if (error) {
      console.error(`❌ Erreur upload ${file}:`, error.message);
    } else {
      console.log(`✅ Upload réussi: ${file}`);
    }
  }
}

uploadEmails();
