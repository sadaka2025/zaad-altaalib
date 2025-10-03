import fs from 'fs-extra';
import path from 'path';
import mammoth from 'mammoth';

// 🔹 Cours et semestre
const courseSlug = 'fiqh'; // fiqh, akhlaq, hadith…
const semester = 's1'; // s1, s2, etc.

// 🔹 Chemins adaptés
const inputRoot = path.join(
  process.cwd(),
  `public/PDFs/year2/pdfInfoChat/pdfExtractionCourse/${semester}/${courseSlug}`
);

const outputRoot = path.join(
  process.cwd(),
  `public/PDFs/year2/htmlExtractionCourse/${semester}/${courseSlug}`
);

// === CSS intégré pour style arabe + bouton ===
const blogStyle = `
  <style>
    body {
      font-family: 'Arabic Typesetting', 'Noto Naskh Arabic', serif;
      font-size: 24px;
      line-height: 1;
      padding: 2rem;
      max-width: 850px;
      margin: auto;
      background: #fefefe;
      color: #111;
      direction: rtl;
      text-align: justify;
    }
    h1 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    p {
      margin-bottom: 1.5rem;
      text-align: justify;
    }
    ul, ol {
      margin: 1rem 2rem;
      padding: 0;
    }
    li {
      margin-bottom: 0.6rem;
      line-height: 1.4;
    }
    /* Bouton de téléchargement */
    .container {
      text-align: center;
      margin: 2rem 0;
    }
    .button {
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      position: relative;
      color: #eeeeee;
      font-weight: 600;
      font-size: 15px;
      background-color: #153f00;
      padding: 15px 50px;
      overflow: hidden;
      border-radius: 6px;
    }
    .button span {
      position: relative;
      z-index: 1;
    }
    .button:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 470%;
      width: 140%;
      background: #52b71f;
      transition: all 0.5s ease-in-out;
      transform: translateX(-100%) translateY(-25%) rotate(45deg);
    }
    .button:hover:after {
      transform: translateX(-9%) translateY(-25%) rotate(45deg);
    }
  </style>
`;

async function convertDir(srcDir, destDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  let globalCounter = 1; // compteur unique pour tous les fichiers

  for (let entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name.replace('.docx', '.html'));

    if (entry.isDirectory()) {
      await convertDir(srcPath, path.join(destDir, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.docx')) {
      console.log('📄 Conversion:', srcPath);

      try {
        const result = await mammoth.extractRawText({ path: srcPath });
        const paragraphs = result.value
          .split('\n')
          .filter((p) => p.trim() !== '');

        let bodyHtml = '';
        let title = paragraphs.length > 0 ? paragraphs[0].trim() : 'Document';

        // Le premier paragraphe devient le titre avec ID unique
        bodyHtml += `<h1 id="sent${globalCounter}">${title}</h1>\n`;
        globalCounter++;

        // Les autres paragraphes en <p> avec ID unique
        paragraphs.slice(1).forEach((p) => {
          bodyHtml += `<p id="sent${globalCounter}">${p.trim()}</p>\n`;
          globalCounter++;
        });

        const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${blogStyle}
</head>
<body>
  <div class="container">
    <a href="${path.basename(destPath)}" download>
      <button class="button"><span>📥 Télécharger cette fiche</span></button>
    </a>
  </div>
  ${bodyHtml}
</body>
</html>`;

        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, fullHtml, 'utf-8');

        console.log('✅ Créé:', destPath);
      } catch (err) {
        console.error('❌ Erreur conversion', srcPath, err.message);
      }
    }
  }
}

(async () => {
  try {
    await convertDir(inputRoot, outputRoot);
    console.log('🎉 Conversion terminée!');
  } catch (err) {
    console.error('Erreur globale:', err.message);
  }
})();
