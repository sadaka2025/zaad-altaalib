// src/scripts/enrichAllQuestions.js
import fs from 'fs-extra';
import path from 'path';
import * as cheerio from 'cheerio';

// === Parcourir récursivement les dossiers pour récupérer toutes les matières ===
async function getCourses(rootDir) {
  const courses = [];

  const years = await fs.readdir(rootDir, { withFileTypes: true });
  for (const yearDir of years) {
    if (!yearDir.isDirectory()) continue;
    const yearPath = path.join(rootDir, yearDir.name);

    const semesters = await fs.readdir(yearPath, { withFileTypes: true });
    for (const semDir of semesters) {
      if (!semDir.isDirectory()) continue;
      const semesterPath = path.join(yearPath, semDir.name);

      const courseDirs = await fs.readdir(semesterPath, {
        withFileTypes: true,
      });
      let counter = 1; // numéro du cours pour JSON
      for (const courseDir of courseDirs) {
        if (!courseDir.isDirectory()) continue;
        courses.push({
          year: yearDir.name,
          semester: semDir.name,
          slug: courseDir.name,
          path: path.join(semesterPath, courseDir.name),
          number: counter, // ajoute le numéro du cours
        });
        counter++;
      }
    }
  }

  return courses;
}

// === Lire récursivement tous les fichiers HTML ===
async function getAllHtmlFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getAllHtmlFiles(fullPath);
      files = files.concat(subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// === Enrichir un JSON pour une matière donnée ===
async function enrichCourse(course) {
  const jsonPath = path.join(
    course.path,
    `${course.slug}_course${course.number}.json`
  );

  if (!fs.existsSync(jsonPath)) {
    console.warn(
      `⚠️ JSON non trouvé pour ${course.slug} (${course.year} ${course.semester}) : ${jsonPath}`
    );
    return; // ne crée pas de fichier vide, passe au cours suivant
  }

  const htmlRoot = path.join(
    process.cwd(),
    `public/PDFs/${course.year}/htmlExtractionCourse/${course.semester}/${course.slug}`
  );

  let data = await fs.readJson(jsonPath);
  const questions = data.questions || [];
  const htmlFiles = await getAllHtmlFiles(htmlRoot);

  const htmlMap = {};
  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf-8');
    const $ = cheerio.load(html);

    const idMap = {};
    $('h1, p').each((_, el) => {
      const id = $(el).attr('id');
      if (id) {
        const text = $(el).text().trim();
        if (text) idMap[text] = id;
      }
    });

    htmlMap[
      path
        .relative(path.join(process.cwd(), 'public'), file)
        .replace(/\\/g, '/')
    ] = idMap;
  }

  for (const q of questions) {
    const reason = (q.answerReason || '').trim();
    if (!reason) continue;

    let found = false;
    for (const [fileKey, idMap] of Object.entries(htmlMap)) {
      for (const [text, id] of Object.entries(idMap)) {
        if (text.includes(reason.slice(0, 30))) {
          q.textReference = reason;
          q.textReferenceLink = `${fileKey}#${id}`;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found && Object.keys(htmlMap).length) {
      const [firstFile, firstIds] = Object.entries(htmlMap)[0];
      const firstId = Object.values(firstIds)[0] || 'sent1';
      q.textReference = reason;
      q.textReferenceLink = `${firstFile}#${firstId}`;
      console.warn(
        `⚠️ Question ${q.id} texte non trouvé, liaison au premier ID ${firstFile}#${firstId}`
      );
    }
  }

  await fs.writeJson(jsonPath, data, { spaces: 2 });
  console.log(
    `🎉 JSON enrichi pour ${course.year} ${course.semester} ${course.slug}`
  );
}

// === Fonction principale ===
async function enrichAll() {
  const rootDir = path.join(process.cwd(), 'src/dataquizCourse/years');
  const courses = await getCourses(rootDir);

  for (const course of courses) {
    await enrichCourse(course);
  }

  console.log('✅ Toutes les matières existantes ont été enrichies.');
}

enrichAll().catch((err) => console.error(err));
