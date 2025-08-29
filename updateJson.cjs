const fs = require("fs");

// ⚡️ Ton projet Supabase
const SUPABASE_URL =
  "https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public";

// 📂 Chemin vers ton JSON
const INPUT_JSON = "public/data/years/year1/subjects_s1s2/fiqh_data_s1s2.json";
const OUTPUT_JSON =
  "public/data/years/year1/subjects_s1s2/fiqh_data_s1s2_updated.json";

// 📂 Dossier Supabase (à ajuster selon le semestre)
const STORAGE_PATH = "pdfExtractionCourse";

// Charger le JSON
let data = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));

// Parcourir tous les semestres
Object.keys(data.semesters).forEach((semesterKey) => {
  const semester = data.semesters[semesterKey];

  if (semester.contentLinks) {
    Object.keys(semester.contentLinks).forEach((lessonId) => {
      const lesson = semester.contentLinks[lessonId];

      // Nouveau lien Supabase → exemple : pdfExtractionCourse/s1/fiqh/lesson1.pdf
      const newUrl = `${SUPABASE_URL}/${STORAGE_PATH}/s${semesterKey}/fiqh/lesson${lessonId}.pdf`;

      // Remplacer uniquement textExtraction
      lesson.textExtraction = newUrl;

      console.log(`🔗 Semestre ${semesterKey}, Leçon ${lessonId} → ${newUrl}`);
    });
  }
});

// Sauvegarder le fichier mis à jour
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(data, null, 2), "utf8");

console.log(`✅ Fichier mis à jour → ${OUTPUT_JSON}`);
