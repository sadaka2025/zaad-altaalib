// upload-pdfs.js
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import glob from "glob";

// 🔑 Service Role (⚠️ jamais côté frontend)
const SUPABASE_URL = "https://ariqdghgxknuvowhgftt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk";

const BUCKET = "pdfs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Dossier local à parcourir
const localDir = path.join(process.cwd(), "public", "PDFs");

async function uploadAllPdfs() {
  const files = glob.sync("**/*.pdf", { cwd: localDir });

  if (files.length === 0) {
    console.log("⚠️ Aucun PDF trouvé dans", localDir);
    return;
  }

  console.log(`📂 ${files.length} fichiers PDF trouvés.`);

  for (const relativePath of files) {
    const fullPath = path.join(localDir, relativePath);
    const fileBuffer = fs.readFileSync(fullPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(relativePath, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/pdf",
      });

    if (error) {
      console.error(`❌ Erreur upload ${relativePath}:`, error.message);
    } else {
      // Génération URL publique
      const { data: publicUrl } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(relativePath);

      console.log(`✅ Uploadé: ${relativePath}`);
      console.log(`🔗 URL publique: ${publicUrl.publicUrl}\n`);
    }
  }

  console.log("🎉 Tous les PDFs ont été uploadés !");
  await checkBucketContents();
}

async function checkBucketContents() {
  console.log("🔎 Vérification du bucket 'pdfs'...");

  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("❌ Erreur check bucket:", error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log("📂 Le bucket 'pdfs' est VIDE !");
  } else {
    console.log(`📂 ${data.length} fichiers trouvés dans le bucket :`);
    data.forEach((file) => console.log("   - " + file.name));
  }
}

// Lance l’upload
uploadAllPdfs();
