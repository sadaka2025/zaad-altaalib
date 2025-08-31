import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsSection = ({ stats }) => {
  return (
    <section className="bg-white py-12">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold">
          مشيخة الزيتونة… حيث الأصالة والثقة | أكثر من{' '}
          <span className="text-red-600">
            <CountUp end={700} duration={3} separator="," />
          </span>{' '}
          طالب على درب المشايخ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {/* Box 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-200"
        >
          <p className="text-4xl font-bold text-red-600">
            <CountUp end={stats.participants} duration={3} />+
          </p>
          <p className="text-gray-600">Participants</p>
        </motion.div>

        {/* Box 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-200"
        >
          <p className="text-4xl font-bold text-red-600">
            <CountUp end={stats.positiveReviews} duration={3} />%
          </p>
          <p className="text-gray-600">des avis reçus sont positifs</p>
        </motion.div>

        {/* Box 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-200"
        >
          <p className="text-4xl font-bold text-red-600">
            <CountUp end={stats.questions} duration={3} separator="," />+
          </p>
          <p className="text-gray-600">Questions et réponses</p>
        </motion.div>

        {/* Box 4 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-200"
        >
          <p className="text-4xl font-bold text-red-600">
            <CountUp end={stats.videos} duration={3} />+
          </p>
          <p className="text-gray-600">
            Vidéos formation ({stats.videosDetail})
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
