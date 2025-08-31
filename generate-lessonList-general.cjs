// generate-lessonList-general.cjs
const fs = require('fs');
const path = require('path');

// 🔹 Dossier contenant les fichiers JSON de toutes les matières
const INPUT_DIR = path.join(__dirname, 'public/data/years/year1/subjects_s1s2');

// 🔹 Dossier de sortie
const OUTPUT_DIR = path.join(__dirname, 'src/dataIntro/years/year1/dataLesson');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 🔹 Fonction pour générer lessonList pour un fichier JSON donné
function generateLessonList(inputFile) {
  const raw = fs.readFileSync(inputFile, 'utf-8');
  const json = JSON.parse(raw);

  const lessonList = { semesters: {} };

  for (const [sem, data] of Object.entries(json.semesters || {})) {
    lessonList.semesters[sem] = {
      lessons: (data.lessons || []).map((lesson, idx) => ({
        id: lesson.id ?? idx + 1,
        title: lesson.title,
      })),
      conclusion: {
        title: '📚 الخاتمة',
        sections: (data.conclusion?.sections || []).map((section) => ({
          title: section.title,
          items: (section.items || []).map((item) => ({
            id: item.id,
          })),
        })),
      },
    };
  }

  // Nom de matière extrait du fichier, ex: fiqh_data_s1s2.json → fiqh
  const baseName = path.basename(inputFile, '.json');
  const matiere = baseName.split('_')[0];
  const outputFile = path.join(OUTPUT_DIR, `lessonList${matiere}.json`);

  fs.writeFileSync(outputFile, JSON.stringify(lessonList, null, 2), 'utf-8');
  console.log(`✅ Fichier généré : ${outputFile}`);
}

// 🔹 Parcours tous les fichiers JSON du dossier INPUT_DIR
const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.json'));

files.forEach((file) => {
  const fullPath = path.join(INPUT_DIR, file);
  generateLessonList(fullPath);
});
