// scripts/importAndSyncEmails.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// 🔑 Service Role Key (⚠️ ne jamais exposer côté frontend)
const SUPABASE_URL = 'https://ariqdghgxknuvowhgftt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk'; // remplace par ta vraie clé

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 📂 Chemins vers les JSON locaux
const localDir = path.join(process.cwd(), 'public', 'dataemail');
const files = [
  { name: 'allowedEmails.json', table: 'allowed_emails' },
  { name: 'blockedEmails.json', table: 'blocked_emails' },
];

async function upsertEmails(filePath, tableName) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Fichier introuvable: ${filePath}`);
    return;
  }

  const emails = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`🔎 ${emails.length} emails trouvés dans ${tableName}.`);

  for (const email of emails) {
    const { error } = await supabase.from(tableName).upsert({ email });
    if (error)
      console.error(
        `❌ Erreur insert ${email} dans ${tableName}:`,
        error.message
      );
    else
      console.log(`✅ Email inséré ou mis à jour: ${email} dans ${tableName}`);
  }
}

async function main() {
  console.log('🚀 Import & Sync des emails depuis JSON locaux...');

  for (const file of files) {
    const fullPath = path.join(localDir, file.name);
    await upsertEmails(fullPath, file.table);
  }

  console.log(
    '🎉 Tous les emails autorisés et bloqués ont été importés et synchronisés !'
  );
}

main();
