import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import articles from '../../datablog/blog.json';
import ArticleCard from './ArticleCard';
import Scene from '../Visitors/Scene';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const navigate = useNavigate();

  // Pagination logique
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="p-5 relative">
      {/* 🔙 Bouton retour en haut à droite */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow text-sm z-50"
        aria-label="رجوع"
      >
        🔙 رجوع
      </button>
      <div className="flex justify-center">
        👈&nbsp;{' '}
        <Scene
          text="صلوا على النبي محمد ﷺ ❤️"
          className="text-[18px] font-amiri font-bold "
        />{' '}
        &nbsp;👉
      </div>{' '}
      {/* Liste des articles */}
      <div className="space-y-6 mt-10">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
