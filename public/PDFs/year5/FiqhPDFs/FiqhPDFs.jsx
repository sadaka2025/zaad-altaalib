import React from "react";

function FiqhPDFs({ year, matiere, pdfs }) {
  // Séparer les cours et les conclusions
  const cours = pdfs.filter((f) => !f.toLowerCase().includes("conclusion"));
  const conclusions = pdfs.filter((f) =>
    f.toLowerCase().includes("conclusion")
  );

  // Générer le lien vers le backend dynamiquement
  const generateLink = (pdfName) =>
    `http://localhost:5000/api/pdf/${year}/${matiere}/${encodeURIComponent(
      pdfName
    )}`;

  return (
    <div>
      <h2>Cours</h2>
      <ul>
        {cours.map((pdf) => (
          <li key={pdf}>
            <a
              href={generateLink(pdf)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pdf.replace(".pdf", "")}
            </a>
          </li>
        ))}
      </ul>

      <h2>Conclusions</h2>
      <ul>
        {conclusions.map((pdf) => (
          <li key={pdf}>
            <a
              href={generateLink(pdf)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pdf.replace(".pdf", "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiqhPDFs;
