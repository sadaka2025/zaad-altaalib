// update-json-pdf.js
import fs from 'fs';
import path from 'path';

const SUPABASE_URL =
  'https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public';

// === Helpers ===
function makeUrl(pathStr) {
  return `${SUPABASE_URL}/pdf/${pathStr}`;
}

function updateLessonLinks(year, subject, semester, lessonId, links) {
  links.summaryPDF = makeUrl(
    `${year}/pdfCourseResume/s${semester}/${subject}/pcr${subject}${lessonId}s${semester}.pdf`
  );
  links.summaryDownload = links.summaryPDF;

  links.textExtraction = makeUrl(
    `${year}/pdfInfoChat/pdfExtractionCourse/s${semester}/${subject}/ec${lessonId}${subject}s${semester}.pdf`
  );

  links.qna = makeUrl(
    `${year}/pdfQuizCourse/s${semester}/${subject}/quizc${lessonId}${subject}s${semester}.pdf`
  );

  return links;
}

function updateConclusionLinks(year, subject, semester, conclusion) {
  conclusion.sections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.id === 'live1') {
        item.links.summaryPDF = makeUrl(
          `${year}/pdfInfoChat/pdfMeeting/s${semester}/${subject}/meet1${subject}s${semester}.pdf`
        );
      }
      if (item.id === 'live2') {
        item.links.summaryPDF = makeUrl(
          `${year}/pdfInfoChat/pdfMeeting/s${semester}/${subject}/meet2${subject}s${semester}.pdf`
        );
      }
      if (item.id === 'live3') {
        item.links.summaryPDF = makeUrl(
          `${year}/pdfInfoChat/pdfMeeting/s${semester}/${subject}/meet3${subject}s${semester}.pdf`
        );
      }
      if (item.id === 'quiz-general') {
        item.links.qna = makeUrl(
          `${year}/pdfQuizSemester/s${semester}/${subject}/quizsem${subject}s${semester}.pdf`
        );
      }
      if (item.id === 'final-exam') {
        item.links.qna = makeUrl(
          `${year}/pdfQuizExam/s${semester}/${subject}/quizexam${subject}s${semester}.pdf`
        );
      }
      if (item.id === 'CombinedCourse') {
        item.links.fusion = makeUrl(
          `${year}/pdfInfoChat/pdfCombinedCourse/s${semester}/${subject}/pcc${subject}s${semester}.pdf`
        );
      }
    });
  });

  return conclusion;
}

// === Main Script ===

const __dirname = path.resolve();
const baseDir = path.join(__dirname, 'public', 'data', 'years');

// Parcourir toutes les années
fs.readdirSync(baseDir).forEach((yearDir) => {
  const yearPath = path.join(baseDir, yearDir);

  if (!fs.statSync(yearPath).isDirectory()) return;

  // Parcourir tous les fichiers *_data_s1s2.json dans chaque année
  const subjectsDir = path.join(yearPath, 'subjects_s1s2');
  if (!fs.existsSync(subjectsDir)) return;

  fs.readdirSync(subjectsDir).forEach((file) => {
    if (!file.endsWith('_data_s1s2.json')) return;

    const subject = file.split('_')[0]; // ex: fiqh_data_s1s2.json → "fiqh"
    const jsonPath = path.join(subjectsDir, file);
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    for (const [semester, semData] of Object.entries(data.semesters)) {
      for (const [lessonId, links] of Object.entries(semData.contentLinks)) {
        semData.contentLinks[lessonId] = updateLessonLinks(
          yearDir,
          subject,
          semester,
          lessonId,
          links
        );
      }

      if (semData.conclusion) {
        semData.conclusion = updateConclusionLinks(
          yearDir,
          subject,
          semester,
          semData.conclusion
        );
      }
    }

    // Fichier de sortie
    const outputPath = path.join(
      subjectsDir,
      file.replace('.json', '_updated.json')
    );

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ JSON updated successfully: ${outputPath}`);
  });
});
