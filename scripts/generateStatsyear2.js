import fs from 'fs';
import path from 'path';

// === Liste des matières ===
const subjects = [
  'akhlaq',
  'aqida',
  'fiqh',
  'hadith',
  'nahw',
  'sirah',
  'tajwid',
];

// === Fonction utilitaire pour compter les éléments ===
function countItems(node) {
  if (!node) return 0;
  if (Array.isArray(node)) return node.length;
  if (typeof node === 'object') return Object.keys(node).length;
  return 0;
}

// === Fonction pour générer les stats d'une matière ===
function generateStats(data, subject) {
  const result = {};
  const yearKey = `year${data.meta.year}`;
  result[yearKey] = { [subject]: {} };

  for (const [semesterKey, semesterVal] of Object.entries(data.semesters)) {
    let stats = {
      videos: 0,
      summaryPDF: 0,
      textExtraction: 0,
      quizCourse: 0,
      quizSemester: 0,
      finalExam: 0,
      totalQuiz: 0,
      lives: 0,
      livesPDF: 0,
    };

    // Comptage des leçons
    const lessonsCount = countItems(semesterVal.lessons);
    if (lessonsCount > 0) {
      stats.videos = lessonsCount;
      stats.summaryPDF = lessonsCount;
      stats.textExtraction = lessonsCount;
      stats.quizCourse = lessonsCount;
    }

    // Comptage des sections de conclusion
    if (semesterVal.conclusion) {
      const livesItems =
        semesterVal.conclusion.sections?.find((s) => s.title.includes('لقاءات'))
          ?.items || [];
      stats.lives = countItems(livesItems);
      stats.livesPDF = countItems(livesItems);

      const quizSemester = semesterVal.conclusion.sections
        ?.find((s) => s.title.includes('Quiz'))
        ?.items?.find((i) => i.id === 'quiz-general');
      if (quizSemester) stats.quizSemester = 1;

      const finalExam = semesterVal.conclusion.sections
        ?.find((s) => s.title.includes('Quiz'))
        ?.items?.find((i) => i.id === 'final-exam');
      if (finalExam) stats.finalExam = 1;
    }

    stats.totalQuiz = stats.quizCourse + stats.quizSemester + stats.finalExam;

    result[yearKey][subject][`s${semesterKey}`] = stats;
  }

  // Agrégation année
  const semesters = Object.values(result[yearKey][subject]);
  const yearStats = semesters.reduce(
    (acc, s) => {
      acc.videos += s.videos;
      acc.summaryPDF += s.summaryPDF;
      acc.textExtraction += s.textExtraction;
      acc.quizCourse += s.quizCourse;
      acc.quizSemester += s.quizSemester;
      acc.finalExam += s.finalExam;
      acc.lives += s.lives;
      acc.livesPDF += s.livesPDF;
      return acc;
    },
    {
      videos: 0,
      summaryPDF: 0,
      textExtraction: 0,
      quizCourse: 0,
      quizSemester: 0,
      finalExam: 0,
      lives: 0,
      livesPDF: 0,
    }
  );
  yearStats.totalQuiz =
    yearStats.quizCourse + yearStats.quizSemester + yearStats.finalExam;

  result[yearKey][subject]['yearStats'] = yearStats;

  return result;
}

// === Parcours de tous les fichiers ===
const inputDir = path.resolve('public/data/years/year2/subjects_s1s2');
const outputDir = path.resolve('src/datastat/years/year2');

for (const subject of subjects) {
  const inputPath = path.join(inputDir, `${subject}_data_s1s2.json`);
  const outputPath = path.join(outputDir, `${subject}_stats.json`);

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  Fichier non trouvé : ${inputPath}`);
    continue;
  }

  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const stats = generateStats(input, subject);

  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2), 'utf8');
  console.log(`✅ Stats générées pour ${subject} : ${outputPath}`);
}
