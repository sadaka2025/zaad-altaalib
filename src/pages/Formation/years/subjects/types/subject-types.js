// src/features/subjects/types/subject-types.js
// @ts-check

/**
 * Texte localisé.
 * @typedef {Object} LocaleText
 * @property {string} ar
 * @property {string} [fr]
 * @property {string} [en]
 */

/**
 * Libellés des onglets (clé du tab -> libellé).
 * @typedef {Object.<string, string>} TabLabels
 */

/**
 * Enseignant.
 * @typedef {Object} Instructor
 * @property {string} name
 */

/**
 * Métadonnées d'une matière.
 * @typedef {Object} SubjectMeta
 * @property {number} year
 * @property {string} slug
 * @property {string} [code]
 * @property {LocaleText} title
 * @property {Instructor[]} [instructors]
 * @property {string[]} tabs
 * @property {TabLabels} tabLabels
 */

/**
 * Leçon.
 * @typedef {Object} Lesson
 * @property {(number|string)} id
 * @property {string} title
 */

/**
 * Liens de contenu pour une leçon.
 * @typedef {Object} ContentEntry
 * @property {string} [video]
 * @property {string} [videoDownload]
 * @property {string} [summaryPDF]
 * @property {string} [summaryDownload]
 * @property {string} [textExtraction]
 * @property {string} [qna]
 */

/**
 * Bloc Semestre (liste de leçons + liens par leçon).
 * @typedef {Object} SemesterBlock
 * @property {Lesson[]} lessons
 * @property {Object.<string, ContentEntry>} contentLinks
 */

/**
 * Données de matière (S1/S2).
 * @typedef {Object} SubjectData
 * @property {SubjectMeta} meta
 * @property {{ "1"?: SemesterBlock, "2"?: SemesterBlock }} semesters
 */

// Petite exportation vide pour que ce fichier soit traité comme un module ES.
// (Utile pour certains bundlers / linter, n'impacte pas l'app.)
export {};
