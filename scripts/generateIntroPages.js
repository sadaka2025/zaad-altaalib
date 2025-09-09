// scripts/generateIntroPages.js
import fs from 'fs';
import path from 'path';

const subjects = [
  { key: 'fiqh', comp: 'IntroFikhPage', folder: 'Introfiqh' },
  { key: 'aqida', comp: 'IntroaqidaPage', folder: 'Introaquida' },
  { key: 'hadith', comp: 'IntrohadithPage', folder: 'Introhadith' },
  { key: 'akhlaq', comp: 'IntroakhlakPage', folder: 'Introakhlak' },
  { key: 'nahw', comp: 'IntronahwPage', folder: 'Intronahw' },
  { key: 'sirah', comp: 'IntrosiraPage', folder: 'Introsirah' },
  { key: 'tajwid', comp: 'IntrotajwidPage', folder: 'Introtajwid' },
];

// 📂 Base vers year1/Introsubjects
const baseDir = path.join(
  process.cwd(),
  'src/pages/Formation/years/year1/Introsubjects'
);

// 📄 Fichier modèle = IntroFikhPage.jsx
const templatePath = path.join(baseDir, 'Introfiqh/IntroFikhPage.jsx');
const template = fs.readFileSync(templatePath, 'utf-8');

subjects.forEach(({ key, comp, folder }) => {
  const subjectDir = path.join(baseDir, folder);
  if (!fs.existsSync(subjectDir)) {
    fs.mkdirSync(subjectDir, { recursive: true });
  }

  const filePath = path.join(subjectDir, `${comp}.jsx`);

  let content = template
    // 🔄 Nom du composant
    .replace(/IntroFikhPage/g, comp)
    // 🔄 Imports JSON
    .replace(/lessonListfiqh/g, `lessonList${key}`)
    .replace(/datafqh/g, `data${key}`)
    .replace(/fiqh_stats/g, `${key}_stats`)
    // 🔄 BooksModal
    .replace(/subjectKey="fiqh"/g, `subjectKey="${key}"`)
    // 🔄 Routes navigate
    .replace(/matiere\/fiqh/g, `matiere/${key}`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Généré : ${filePath}`);
});

console.log('🎉 Toutes les IntroPages year1 ont été générées !');
