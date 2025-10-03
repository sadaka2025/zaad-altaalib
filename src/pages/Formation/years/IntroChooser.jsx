import React from 'react';
import { useParams } from 'react-router-dom';
import introMapping from './introIndex.js'; // <-- mettre .js explicitement

export default function IntroChooser() {
  const { year = '1', subjectSlug = '' } = useParams();

  const SubjectMap = introMapping[subjectSlug];
  if (!SubjectMap) {
    return (
      <div className="p-6 text-center">
        ⚠️ Intro non trouvée pour : {subjectSlug}
      </div>
    );
  }

  const Component = SubjectMap[year] || SubjectMap['1'];
  if (!Component) {
    return (
      <div className="p-6 text-center">
        ⚠️ Intro non disponible pour l'année {year}
      </div>
    );
  }

  return <Component />;
}
