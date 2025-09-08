import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsSection = ({ statsJson }) => {
  if (!statsJson || Object.keys(statsJson).length === 0) {
    return (
      <p className="text-center py-12 text-gray-500">Loading statistics...</p>
    );
  }

  const yearKeys = ['year1', 'year2', 'year3', 'year4', 'year5'];

  const totalVideos = yearKeys.reduce(
    (sum, key) => sum + (statsJson[key]?.videos || 0),
    0
  );

  const totalQuizzes = yearKeys.reduce(
    (sum, key) => sum + (statsJson[key]?.totalQuiz || 0),
    0
  );

  const totalLives = yearKeys.reduce(
    (sum, key) => sum + (statsJson[key]?.lives || 0),
    0
  );

  const totalPDFs = yearKeys.reduce(
    (sum, key) =>
      sum +
      (statsJson[key]?.summaryPDF || 0) +
      (statsJson[key]?.textExtraction || 0) +
      (statsJson[key]?.livesPDF || 0),
    0
  );

  const participants = statsJson.participants ?? 700;
  const positiveReviews = statsJson.positiveReviews ?? 95;

  const mainCards = [
    {
      label: 'Participants',
      value: participants,
      suffix: '+',
      color: 'text-red-600',
      hover: 'hover:text-red-700',
    },
    {
      label: 'Received feedback is positive',
      value: positiveReviews,
      suffix: '%',
      color: 'text-red-600',
      hover: 'hover:text-red-700',
    },
    {
      label: 'Q&A (Questions and Answers)',
      value: totalQuizzes,
      suffix: '+',
      color: 'text-red-600',
      hover: 'hover:text-red-700',
    },
    {
      label: 'Training Videos',
      value: totalVideos,
      suffix: '+',
      color: 'text-red-600',
      hover: 'hover:text-red-700',
    },
  ];

  const centeredCards = [
    {
      label: 'Live sessions with the Sheikh',
      value: totalLives,
      suffix: '+',
      color: 'text-gray-400',
      hover: 'hover:text-gray-500',
    },
    {
      label: 'PDFs (extraction text + resume course + text Live sessions)',
      value: totalPDFs,
      suffix: '+',
      color: 'text-gray-400',
      hover: 'hover:text-gray-500',
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="text-center mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Zaytouna Institute… Where Tradition Meets Trust | More than{' '}
          <span className="text-red-600">
            <CountUp end={participants} duration={3} separator="," />
          </span>{' '}
          students on the path of the sheikhs
        </h2>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto justify-items-center mb-6">
        {mainCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200 w-60 transition-all duration-300 hover:shadow-2xl"
          >
            <p
              className={`text-3xl sm:text-4xl font-extrabold transition-colors duration-300 ${card.color} ${card.hover}`}
            >
              <CountUp end={card.value} duration={3} separator="," />
              {card.suffix}
            </p>
            <p className="text-gray-600 sm:text-lg mt-2">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Grille centrée pour Lives et PDFs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto justify-items-center">
        {centeredCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200 w-72 transition-all duration-300 hover:shadow-2xl"
          >
            <p
              className={`text-3xl sm:text-4xl font-extrabold transition-colors duration-300 ${card.color} ${card.hover}`}
            >
              <CountUp end={card.value} duration={3} separator="," />
              {card.suffix}
            </p>
            <p className="text-gray-600 sm:text-lg mt-2">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
