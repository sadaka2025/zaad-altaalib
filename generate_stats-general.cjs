const fs = require('fs');
const path = require('path');

function generateStatsFromFile(filePath) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn(`⚠️ Impossible de lire ou parser le fichier: ${filePath}`);
    return null;
  }

  if (!data.meta || !data.meta.year) {
    console.warn(`⚠️ Fichier ignoré (meta.year absent): ${filePath}`);
    return null;
  }

  const result = {};
  const yearKey = `year${data.meta.year}`;
  result[data.meta.slug] = { [yearKey]: {} };

  let yearTotals = {
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

  for (const sem of Object.keys(data.semesters)) {
    const semData = data.semesters[sem];

    const videos = semData.lessons.length;
    const summaryPDF = semData.lessons.filter(
      (l) => semData.contentLinks[l.id]?.summaryPDF
    ).length;
    const textExtraction = semData.lessons.filter(
      (l) => semData.contentLinks[l.id]?.textExtraction
    ).length;
    const quizCourse = semData.lessons.filter(
      (l) => semData.contentLinks[l.id]?.qna
    ).length;

    let quizSemester = 0,
      finalExam = 0;
    let lives = 0,
      livesPDF = 0;

    if (semData.conclusion) {
      const liveSection = semData.conclusion.sections.find((s) =>
        s.title.includes('اللقاءات المباشرة')
      );
      if (liveSection) {
        lives = liveSection.items.filter((i) => i.links.video).length;
        livesPDF = liveSection.items.filter((i) => i.links.summaryPDF).length;
      }

      const quizSection = semData.conclusion.sections.find((s) =>
        s.title.includes('Quiz Fin Semestre')
      );
      if (quizSection) {
        quizSemester = quizSection.items.filter(
          (i) => i.id === 'quiz-general'
        ).length;
        finalExam = quizSection.items.filter(
          (i) => i.id === 'final-exam'
        ).length;
      }
    }

    const totalQuiz = quizCourse + quizSemester + finalExam;

    const semKey = `semester${sem}`;
    result[data.meta.slug][yearKey][semKey] = {
      videos,
      summaryPDF,
      textExtraction,
      quizCourse,
      quizSemester,
      finalExam,
      totalQuiz,
      lives,
      livesPDF,
    };

    // cumuler dans totaux annuels
    for (const key of Object.keys(yearTotals)) {
      yearTotals[key] += result[data.meta.slug][yearKey][semKey][key];
    }
  }

  result[data.meta.slug][yearKey][
    `total${yearKey.charAt(0).toUpperCase() + yearKey.slice(1)}`
  ] = yearTotals;
  return result;
}

function processAllYears() {
  const baseDataDir = path.join('public', 'data', 'years');
  const baseStatDir = path.join('public', 'datastat', 'years');

  for (let y = 1; y <= 5; y++) {
    const yearDir = path.join(baseDataDir, `year${y}`, 'subjects_s1s2');
    const statYearDir = path.join(baseStatDir, `year${y}`);

    if (!fs.existsSync(yearDir)) {
      console.warn(`⚠️ Dossier introuvable: ${yearDir}`);
      continue;
    }

    if (!fs.existsSync(statYearDir)) {
      fs.mkdirSync(statYearDir, { recursive: true });
    }

    const subjectFiles = fs
      .readdirSync(yearDir)
      .filter((f) => f.endsWith('_data_s1s2.json'));

    subjectFiles.forEach((file) => {
      const filePath = path.join(yearDir, file);
      const stats = generateStatsFromFile(filePath);
      if (!stats) return;

      const subjectSlug = Object.keys(stats)[0];
      const outputFile = path.join(statYearDir, `${subjectSlug}stat.json`);

      fs.writeFileSync(outputFile, JSON.stringify(stats, null, 2), 'utf8');
      console.log(
        `✅ Statistiques générées pour ${subjectSlug} → ${outputFile}`
      );
    });
  }
}

processAllYears();
