import { Link, useParams } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const { lang } = useParams(); // récupère "ar", "fr" ou "en"
  // Extrait texte pour aperçu
  let excerpt = '';
  if (typeof article.content === 'string') {
    excerpt = article.content.replace(/<[^>]+>/g, '').slice(0, 200) + '...';
  } else if (article.content?.intro) {
    excerpt =
      article.content.intro.replace(/<[^>]+>/g, '').slice(0, 200) + '...';
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-6">
      {/* Image à gauche */}
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full md:w-[327px] h-[154px] object-cover rounded mb-4 md:mb-0 md:mr-4"
        />
      )}

      {/* Contenu texte */}
      <div
        className="flex-1 p-5 text-right relative"
        style={{
          backgroundImage: 'url("/images/textBgImage.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0.5rem',
        }}
      >
        <Link to={`/${lang}/blog-simple/${article.id}`}>
          <h2>{article.title}</h2>
        </Link>
        <p className="text-gray-500 text-sm">{article.date}</p>
        <p className="text-gray-700 mt-2">{excerpt}</p>
        <Link to={`/${lang}/blog-simple/${article.id}`}>اقرأ المزيد →</Link>
      </div>
    </div>
  );
}
