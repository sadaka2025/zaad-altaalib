// scripts/generate_semesters_json.cjs
const fs = require('fs');
const path = require('path');

// chemins
const bucketJsonPath = path.resolve('scripts/bucket_tree.json');
const subjectsDir = path.resolve('public/dataquiz/years/year1');
const semestersJsonPath = path.join(subjectsDir, 'semesters.json');

const BASE =
  'https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public/pdf';

// ---- lecture bucket
function readJson(p) {
  if (!fs.existsSync(p)) throw new Error('Fichier introuvable: ' + p);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const bucket = readJson(bucketJsonPath);

// ---- collecte des fichiers
const files = [];
function walk(node) {
  if (!node) return;
  if (Array.isArray(node)) return node.forEach(walk);
  if (typeof node === 'object') {
    if (node.url && node.name) {
      files.push({ name: node.name, url: node.url });
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

console.log('✅ Fichiers trouvés dans le bucket:', files.length);

// ---- helper : trouver un PDF par motif
function findPdf(subject, sem, type, num = '') {
  // subject en minuscule pour matcher
  const subj = subject.toLowerCase();
  return (
    files.find((f) =>
      f.name.toLowerCase().includes(`${type}${num}${subj}s${sem}`)
    )?.url || ''
  );
}

// ---- construire la structure
const semesters = [
  {
    name: 'Semester 1',
    matieres: [
      'fiqh',
      'tajwid',
      'sirah',
      'aqida',
      'akhlaq',
      'nahw',
      'hadith',
    ].map((m) => ({
      name: m,
      sources: [
        { source: 'مجمع دروس', url: findPdf(m, 1, 'pcc') },
        { source: 'الملتقى الأول', url: findPdf(m, 1, 'meeting', 1) },
        { source: 'الملتقى الثاني', url: findPdf(m, 1, 'meeting', 2) },
        { source: 'الملتقى الثالث', url: findPdf(m, 1, 'meeting', 3) },
        { source: 'الكتاب المصاحب', url: findPdf(m, 1, 'books') },
      ],
    })),
  },
  {
    name: 'Semester 2',
    matieres: [
      'fiqh',
      'tajwid',
      'sirah',
      'aqida',
      'akhlaq',
      'nahw',
      'hadith',
    ].map((m) => ({
      name: m,
      sources: [
        { source: 'مجمع دروس', url: findPdf(m, 2, 'pcc') },
        { source: 'الملتقى الأول', url: findPdf(m, 2, 'meeting', 1) },
        { source: 'الملتقى الثاني', url: findPdf(m, 2, 'meeting', 2) },
        { source: 'الملتقى الثالث', url: findPdf(m, 2, 'meeting', 3) },
        { source: 'الكتاب المصاحب', url: findPdf(m, 2, 'books') },
      ],
    })),
  },
];

// ---- sauvegarde
fs.writeFileSync(semestersJsonPath, JSON.stringify(semesters, null, 2), 'utf8');
console.log('✅ semesters.json créé avec URLs à :', semestersJsonPath);
