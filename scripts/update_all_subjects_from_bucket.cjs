// scripts/update_all_subjects_from_bucket.cjs
// Usage:
//   node scripts/update_all_subjects_from_bucket.cjs ./bucket_tree.json ./public/data/years/year1/subjects_s1s2
//
// ⚡ Ce script met à jour TOUS les fichiers *_data_s1s2.json en fonction de l’arborescence du bucket.

const fs = require('fs');
const path = require('path');

if (process.argv.length < 4) {
  console.error(
    'Usage: node update_all_subjects_from_bucket.cjs <bucket_tree.json> <dossier des JSON sujets>'
  );
  process.exit(1);
}

const bucketJsonPath = path.resolve(process.argv[2]);
const subjectsDir = path.resolve(process.argv[3]);

const BASE =
  'https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public/pdf';

function readJson(p) {
  if (!fs.existsSync(p)) throw new Error('Fichier introuvable: ' + p);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

console.log('📂 Chargement tree du bucket :', bucketJsonPath);
const bucket = readJson(bucketJsonPath);

// collecte des fichiers du bucket
const files = [];
function walk(node) {
  if (!node) return;
  if (Array.isArray(node)) return node.forEach(walk);
  if (typeof node === 'object') {
    if (node.type === 'file' && node.path && node.name) {
      files.push({ name: node.name, path: node.path });
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
    else {
      for (const k of Object.keys(node)) {
        if (Array.isArray(node[k]) || (node[k] && typeof node[k] === 'object'))
          walk(node[k]);
      }
    }
  }
}
walk(bucket);

console.log("✅ Fichiers trouvés dans l'arbre:", files.length);

// build map: basename -> [paths]
const map = files.reduce((acc, f) => {
  acc[f.name] = acc[f.name] || [];
  acc[f.name].push(f.path);
  return acc;
}, {});

function findBest(basename, preferFolder, sem) {
  const candidates = (map[basename] || []).slice();
  if (!candidates.length) return null;
  if (preferFolder) {
    const pref = candidates.filter((p) => p.includes(preferFolder));
    if (pref.length) return pref[0];
  }
  if (sem) {
    const pref = candidates.filter(
      (p) => p.includes(`/s${sem}/`) || p.includes(`/s${sem}`)
    );
    if (pref.length) return pref[0];
  }
  return candidates[0];
}

function setUrlIfFound(obj, key, basename, preferFolder, sem) {
  const found = findBest(basename, preferFolder, sem);
  if (found) {
    const cleanPath = found.replace(/^\/+/, ''); // enlève / au début
    obj[key] = `${BASE}/${encodeURI(cleanPath)}`;
    return true;
  }
  return false;
}

function updateSubject(jsonPath) {
  console.log(`\n🔄 Traitement du fichier: ${path.basename(jsonPath)}`);
  const subjectData = readJson(jsonPath);

  const subject =
    subjectData.meta?.slug || path.basename(jsonPath).split('_')[0];
  let fixed = 0;
  let warnings = [];

  const semesters = subjectData.semesters || {};
  for (const sem of Object.keys(semesters)) {
    const contentLinks = semesters[sem].contentLinks || {};
    for (const lessonKey of Object.keys(contentLinks)) {
      const lesson = contentLinks[lessonKey];
      const n = String(lessonKey);

      // 📘 Résumé du cours
      if (
        setUrlIfFound(
          lesson,
          'summaryPDF',
          `pcr${n}${subject}s${sem}.pdf`,
          'pdfCourseResume',
          sem
        )
      ) {
        lesson.summaryDownload = lesson.summaryPDF;
        fixed++;
      }

      // 📝 Extraction du texte
      if (
        setUrlIfFound(
          lesson,
          'textExtraction',
          `ec${n}${subject}s${sem}.pdf`,
          'pdfExtractionCourse',
          sem
        )
      )
        fixed++;

      // ❓ Quiz du cours
      if (
        setUrlIfFound(
          lesson,
          'qna',
          `quizc${n}${subject}s${sem}.pdf`,
          'pdfQuizCourse',
          sem
        )
      )
        fixed++;
    }

    // 📌 Conclusion / extras
    const conclusion = semesters[sem].conclusion;
    if (conclusion && conclusion.sections) {
      for (const section of conclusion.sections) {
        for (const item of section.items || []) {
          const links = item.links || {};

          // 🟣 Meetings
          if (
            item.id &&
            (item.id.includes('ملتقى') ||
              item.id.toLowerCase().includes('meet'))
          ) {
            for (let i = 1; i <= 5; i++) {
              if (
                setUrlIfFound(
                  links,
                  'meeting',
                  `meeting${i}${subject}s${sem}.pdf`,
                  'pdfMeeting',
                  sem
                )
              ) {
                // ✅ Même lien pour summaryPDF et summaryDownload
                links.summaryPDF = links.meeting;
                links.summaryDownload = links.meeting;
                fixed++;
              }
            }
          }

          // 🟢 Quiz semestriel
          if (item.id === 'quiz-general') {
            if (
              setUrlIfFound(
                links,
                'quizSemester',
                `quizsem${subject}s${sem}.pdf`,
                'pdfQuizSemester',
                sem
              )
            ) {
              links.summaryPDF = links.quizSemester;
              links.summaryDownload = links.quizSemester;
              fixed++;
            }
          }

          // 🔴 Examen final
          if (item.id === 'final-exam') {
            if (
              setUrlIfFound(
                links,
                'quizExam',
                `quizexam${subject}s${sem}.pdf`,
                'pdfQuizExam',
                sem
              )
            ) {
              links.summaryPDF = links.quizExam;
              links.summaryDownload = links.quizExam;
              fixed++;
            }
          }

          // 📚 Cours combiné
          if (item.id === 'CombinedCourse') {
            if (
              setUrlIfFound(
                links,
                'combinedCourse',
                `pcc${subject}s${sem}.pdf`,
                'pdfCombinedCourse',
                sem
              )
            ) {
              links.summaryPDF = links.combinedCourse;
              links.summaryDownload = links.combinedCourse;
              fixed++;
            }
          }

          // 📖 Livres / Study Books
          if (item.id && item.id.toLowerCase().includes('book')) {
            if (
              setUrlIfFound(
                links,
                'studyBooks',
                `books${subject}s${sem}.pdf`,
                'pdfStudyBooks',
                sem
              )
            )
              fixed++;
          }

          item.links = links;
        }
      }
    }
  }

  // 💾 Sauvegarde avec backup
  const backupPath = jsonPath + '.bak';
  fs.copyFileSync(jsonPath, backupPath);
  fs.writeFileSync(jsonPath, JSON.stringify(subjectData, null, 2), 'utf8');

  console.log(`✅ Sauvegardé: ${jsonPath} (backup: ${backupPath})`);
  console.log(`🔗 Liens mis à jour: ${fixed}`);
  if (warnings.length) {
    console.log('⚠️ Non trouvés:', warnings.slice(0, 20));
  }
}

// Exécution sur tous les fichiers *_data_s1s2.json
fs.readdirSync(subjectsDir)
  .filter((f) => f.endsWith('_data_s1s2.json'))
  .forEach((file) => {
    updateSubject(path.join(subjectsDir, file));
  });
