import fs from 'fs';
import path from 'path';

const baseDir = 'src/datastat/years'; // chemin vers dossier contenant year1, year2, ...

const globalStats = {};
const totalAllYears = {
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

// Parcourir les sous-dossiers year1 → year5
fs.readdirSync(baseDir).forEach((yearFolder) => {
  const yearPath = path.join(baseDir, yearFolder);

  if (fs.lstatSync(yearPath).isDirectory()) {
    // Initialisation
    globalStats[yearFolder] = {
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

    // Parcourir tous les fichiers JSON dans ce sous-dossier
    const files = fs.readdirSync(yearPath).filter((f) => f.endsWith('.json'));

    files.forEach((file) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(yearPath, file), 'utf8')
      );

      // Chaque fichier contient l'année en clé (year1, year2, etc.)
      for (const yearKey in data) {
        const subjects = data[yearKey];

        for (const subjectName in subjects) {
          const subject = subjects[subjectName];

          if (subject.yearStats) {
            const stats = subject.yearStats;

            globalStats[yearFolder].videos += stats.videos || 0;
            globalStats[yearFolder].summaryPDF += stats.summaryPDF || 0;
            globalStats[yearFolder].textExtraction += stats.textExtraction || 0;
            globalStats[yearFolder].quizCourse += stats.quizCourse || 0;
            globalStats[yearFolder].quizSemester += stats.quizSemester || 0;
            globalStats[yearFolder].finalExam += stats.finalExam || 0;
            globalStats[yearFolder].totalQuiz += stats.totalQuiz || 0;
            globalStats[yearFolder].lives += stats.lives || 0;
            globalStats[yearFolder].livesPDF += stats.livesPDF || 0;
          }
        }
      }
    });

    // Ajouter cette année au total général
    const s = globalStats[yearFolder];
    totalAllYears.videos += s.videos;
    totalAllYears.summaryPDF += s.summaryPDF;
    totalAllYears.textExtraction += s.textExtraction;
    totalAllYears.quizCourse += s.quizCourse;
    totalAllYears.quizSemester += s.quizSemester;
    totalAllYears.finalExam += s.finalExam;
    totalAllYears.totalQuiz += s.totalQuiz;
    totalAllYears.lives += s.lives;
    totalAllYears.livesPDF += s.livesPDF;
  }
});

globalStats.totalAllYears = totalAllYears;

// Écriture du fichier
fs.writeFileSync(
  'src/datastat/years/global_stats.json',
  JSON.stringify(globalStats, null, 2)
);
console.log('✅ global_stats.json généré avec succès !');
