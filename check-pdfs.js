// check-pdfs.js
import { createClient } from "@supabase/supabase-js";

// 🔑 Service Role (⚠️ jamais côté frontend)
const SUPABASE_URL = "https://ariqdghgxknuvowhgftt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTk5Njg4NiwiZXhwIjoyMDcxNTcyODg2fQ.5GvrFHXupLjQqdQxxucik6JkSpt2GUgUpy8gdJrTgXk";

const BUCKET = "pdfs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function listPdfs() {
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) return console.error(error.message);

  console.log("📂 Liste des PDFs :");
  data.forEach((file) => {
    const url = supabase.storage.from(BUCKET).getPublicUrl(file.name)
      .data.publicUrl;
    console.log(`${file.name} → ${url}`);
  });
}

listPdfs();
