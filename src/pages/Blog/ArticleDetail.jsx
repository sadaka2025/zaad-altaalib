// src/pages/Blog/ArticleDetail.jsx
import { Link, useParams } from 'react-router-dom';
import articles from '../../datablog/blog.json';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from 'react-share';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id.toString() === id);

  if (!article) {
    return (
      <div className="p-6 text-center text-red-500">Article introuvable ❌</div>
    );
  }

  const intro = article.content?.intro || '';
  const paragraph2 = article.content?.paragraph2 || '';
  const conclusion = article.content?.conclusion || '';

  // ✅ background dynamique (si non défini → valeur par défaut)
  const bgImage = article.background || '/images/textBgImage.jpg';

  const articleUrl = window.location.href; // URL actuelle
  const shareText = article.title; // Titre comme texte de partage

  return (
    <div
      className="min-h-screen p-6 bg-gray-50"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Retour */}
      <Link
        to="/blog-simple"
        className="inline-block mb-4 text-blue-600 hover:underline font-semibold"
      >
        ← الرجوع إلى الصفحة الرئيسية
      </Link>

      <h1 className="text-3xl font-bold text-blue-600 mb-2">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{article.date}</p>

      {/* Vidéo principale autoplay ou image */}
      {article.video ? (
        <video
          src={article.video}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full aspect-video object-cover rounded mb-6"
        />
      ) : article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-video object-cover rounded mb-6"
        />
      ) : null}

      {/* Introduction */}
      {intro && (
        <div
          className="prose prose-lg text-gray-800 text-right mb-6 p-4 rounded"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}

      {/* Deuxième paragraphe avec image à gauche */}
      {paragraph2 && article.image && (
        <div className="flex flex-col md:flex-row mb-6 items-start gap-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-[327px] h-[154px] object-cover rounded mx-auto md:mx-0"
          />
          <div
            className="prose prose-lg text-gray-800 md:flex-1 text-right p-4 rounded"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            dangerouslySetInnerHTML={{ __html: paragraph2 }}
          />
        </div>
      )}

      {/* Conclusion */}
      {conclusion && (
        <div
          className="prose prose-lg text-gray-800 text-right p-4 rounded"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          dangerouslySetInnerHTML={{ __html: conclusion }}
        />
      )}

      {/* Zone de partage social */}
      <div className="mt-8 text-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          شارك المقال عبر :
        </h2>
        <div className="flex justify-center gap-3">
          <FacebookShareButton url={articleUrl} quote={shareText}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={articleUrl} title={shareText}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <TelegramShareButton url={articleUrl} title={shareText}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <WhatsappShareButton url={articleUrl} title={shareText}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={articleUrl} title={shareText}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <EmailShareButton url={articleUrl} subject={shareText}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
}
