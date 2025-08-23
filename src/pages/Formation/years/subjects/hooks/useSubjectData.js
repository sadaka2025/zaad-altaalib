// src/features/subjects/hooks/useSubjectData.js
// @ts-check
import { useEffect, useState } from "react";

/** @typedef {import('../types/subject-types').SubjectData} SubjectData */

/**
 * Validation minimale pour sécuriser les JSON.
 * @param {any} x
 * @returns {SubjectData}
 */
function assertSubjectData(x) {
  if (!x || typeof x !== "object")
    throw new Error("Invalid SubjectData: not an object");
  if (!x.meta || !x.meta.title || !x.semesters)
    throw new Error("Invalid SubjectData: missing keys (meta/title/semesters)");
  if (!Array.isArray(x.meta.tabs))
    throw new Error("Invalid SubjectData: meta.tabs must be array");
  if (typeof x.meta.title.ar !== "string")
    throw new Error("Invalid SubjectData: meta.title.ar must be string");
  return /** @type {SubjectData} */ (x);
}

/**
 * Hook pour charger les données d'une matière selon année et slug.
 * Exemple de chemin attendu :
 *   /public/data/years/year1/subjects_s1s2/fiqh_data_s1s2.json
 *
 * @param {string|number} year - Année (1 → 5)
 * @param {string} subjectSlug - Slug matière (ex: "fiqh", "nahw")
 */
export function useSubjectData(year, subjectSlug) {
  const [data, setData] = useState(/** @type {SubjectData|null} */ (null));
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setPending(true);
        setError("");

        // 📂 Construction dynamique du chemin
        const yearFolder = `year${year}`;
        const filename = `${subjectSlug}_data_s1s2.json`;
        const path = `/data/years/${yearFolder}/subjects_s1s2/${filename}`;

        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);

        const json = await res.json();
        const safe = assertSubjectData(json);

        if (!cancel) setData(safe);
      } catch (e) {
        if (!cancel)
          setError(
            `Erreur: impossible de charger ${subjectSlug} pour l'année ${year}.`
          );
        console.error(e);
      } finally {
        if (!cancel) setPending(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [year, subjectSlug]);

  return { data, pending, error };
}
