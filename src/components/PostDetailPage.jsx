import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../assets/style/style.css'; 

function PostDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null); 
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        // Конкретті постты ID арқылы алу
        const response = await axios.get(`https://8aefe87c60033c7c.mokky.dev/shop/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error("Деректерді алу мүмкін болмады:", error);
      }
    }
    fetchPost();
  }, [id]);

  async function SubmitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    try {
      await axios.post('https://621a91c96fd2860b.mokky.dev/coments', {
        postId: id,
        text: commentText,
        createdAt: new Date().toISOString()
      });
      setSubmitMessage("Пікір қосылды!");
      setCommentText('');
    } catch (error) {
      setSubmitMessage("Қате орын алды");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!news) {
    return <div className="loading">Жүктелуде...</div>;
  }

  // СУРЕТТІ АНЫҚТАУ: JSON-да "img" немесе "image" болуы мүмкін
  const newsImageUrl = news.img || news.image;

  return (
    <div className="post-detail-container">
      <div className="post-detail-content">
        {/* Жаңалық тақырыбы */}
        <h1 className="post-title">{news.title}</h1>
        
        <div className="post-meta">
           <span className="post-date">{news.date}</span>
           {/* Категория атауы - енді бәріне ортақ шығады */}
           <span className="post-category-label">Категория: {news.category}</span>
        </div>

        {/* СУРЕТ ШЫҒАРУ БӨЛІМІ */}
        <div className="post-image-wrapper">
          {newsImageUrl ? (
            <img 
              src={newsImageUrl} 
              alt={news.title} 
              className="full-post-image" 
              onError={(e) => {
                // Егер сілтеме қате болса, placeholder сурет қойылады
                e.target.src = "https://placehold.co/600x400?text=Сурет+табылмады";
              }}
            />
          ) : (
            <div className="image-placeholder">Сурет көрсетілмеген</div>
          )}
        </div>

        {/* Толық сипаттамасы */}
        <div className="post-description">
           <p>{news.description || "Бұл жаңалық туралы ақпарат жақын арада толықтырылады."}</p>
        </div>

        <hr className="divider" />

        {/* Пікір қалдыру формасы */}
        <form className="comment-form" onSubmit={SubmitComment}>
          <textarea 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Пікіріңізді жазыңыз..."
          />
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Жіберілуде...' : 'Жіберу'}
          </button>
        </form>

        {submitMessage && <p className="status-message">{submitMessage}</p>}
      </div>
    </div>
  );
}

export default PostDetailPage;