// update-json-pdfs.js
import fs from "fs";
import path from "path";

const SUPABASE_URL =
  "https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public";

// === Helpers ===
function makeUrl(pathStr) {
  return `${SUPABASE_URL}/pdfs/${pathStr}`;
}

function updateLessonLinks(semester, lessonId, links) {
  links.summaryPDF = makeUrl(
    `year1/pdfCourseResume/s${semester}/fiqh/pcrf${lessonId}s${semester}.pdf`
  );
  links.summaryDownload = links.summaryPDF;

  links.textExtraction = makeUrl(
    `year1/pdfInfoChat/pdfExtractionCourse/s${semester}/fiqh/ec${lessonId}fiqhs${semester}.pdf`
  );

  links.qna = makeUrl(
    `year1/pdfQuizCourse/s${semester}/fiqh/quizc${lessonId}fiqhs${semester}.pdf`
  );

  return links;
}

function updateConclusionLinks(conclusion) {
  conclusion.sections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.id === "live1") {
        item.links.summaryPDF = makeUrl(
          "year1/pdfInfoChat/pdfMeeting/s1/fiqh/meet1fiqhs1.pdf"
        );
      }
      if (item.id === "live2") {
        item.links.summaryPDF = makeUrl(
          "year1/pdfInfoChat/pdfMeeting/s1/fiqh/meet2fiqhs1.pdf"
        );
      }
      if (item.id === "live3") {
        item.links.summaryPDF = makeUrl(
          "year1/pdfInfoChat/pdfMeeting/s1/fiqh/meet3fiqhs1.pdf"
        );
      }
      if (item.id === "quiz-general") {
        item.links.qna = makeUrl(
          "year1/pdfQuizSemester/s1/fiqh/quizsemfiqhs1.pdf"
        );
      }
      if (item.id === "final-exam") {
        item.links.qna = makeUrl(
          "year1/pdfQuizExam/s1/fiqh/quizexamfiqhs1.pdf"
        );
      }
      if (item.id === "CombinedCourse") {
        item.links.fusion = makeUrl(
          "year1/pdfInfoChat/pdfCombinedCourse/s1/fiqh/pccfiqhs1.pdf"
        );
      }
    });
  });

  return conclusion;
}

// === Main Script ===

// 📌 chemin absolu vers ton JSON
const __dirname = path.resolve();
const jsonPath = path.join(
  __dirname,
  "public",
  "data",
  "years",
  "year1",
  "subjects_s1s2",
  "fiqh_data_s1s2.json"
);

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

// Update semesters
for (const [semester, semData] of Object.entries(data.semesters)) {
  for (const [lessonId, links] of Object.entries(semData.contentLinks)) {
    semData.contentLinks[lessonId] = updateLessonLinks(
      semester,
      lessonId,
      links
    );
  }

  if (semData.conclusion) {
    semData.conclusion = updateConclusionLinks(semData.conclusion);
  }
}

// 📌 chemin de sortie
const outputPath = path.join(
  __dirname,
  "public",
  "data",
  "years",
  "year1",
  "subjects_s1s2",
  "fiqh_data_s1s2_updated.json"
);

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

console.log(`✅ JSON updated successfully: ${outputPath}`);
