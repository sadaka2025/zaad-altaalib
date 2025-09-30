// src/utils/fixArabic.jsx

// Fonction utilitaire pour corriger l’ordre des lettres arabes
export function fixArabicText(text) {
  return text
    .split(/\s+/)
    .map((word) =>
      /[\u0600-\u06FF]/.test(word) ? word.split('').reverse().join('') : word
    )
    .join(' ');
}
