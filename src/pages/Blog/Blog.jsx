import { useState } from 'react';
import articles from '../../datablog/blog.json';
import ArticleCard from '../../components/ArticleCard';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Pagination logique
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div>
      {/* Liste des articles */}
      {currentArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

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
