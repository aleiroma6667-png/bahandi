import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPage = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // 1. Загрузка данных товара и отзывов
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Загружаем товар
                const productRes = await fetch(`https://8aefe87c60033c7c.mokky.dev/BAHANDI/${id}`);
                const productData = await productRes.json();
                setProduct(productData);

                // Загружаем отзывы именно для этого товара (фильтрация по productId)
                const commentsRes = await fetch(`https://8aefe87c60033c7c.mokky.dev/comments?productId=${id}`);
                const commentsData = await commentsRes.json();
                setComments(commentsData);

                setLoading(false);
            } catch (err) {
                console.error("Қате кетті:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 2. Функция отправки отзыва на сервер
    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        const commentObj = {
            productId: id, // Привязываем отзыв к ID товара
            user: "Қонақ",
            text: newComment,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch('https://8aefe87c60033c7c.mokky.dev/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentObj)
            });

            if (response.ok) {
                const savedComment = await response.json();
                setComments([...comments, savedComment]); // Обновляем список на экране
                setNewComment(""); 
            }
        } catch (error) {
            console.error("Пікір жіберу қатесі:", error);
        }
    };

    if (loading) return <div className="loader">ЖҮКТЕЛУДЕ...</div>;
    if (!product) return <div className="loader">Тауар табылмады</div>;

    return (
        <div className="detail-page-container">
            <button onClick={() => navigate(-1)} className="back-link">
                ← Артқа қайту
            </button>

            <div className="detail-content-card">
                <div className="detail-media-section">
                    <img 
                        src={product.image || product.img} 
                        alt={product.title} 
                        className="main-product-image"
                    />
                </div>

                <div className="detail-info-section">
                    <h1 className="product-main-title">{product.title}</h1>
                    <span className="product-main-price">{product.price} ₸</span>
                    
                    <div className="product-main-desc">
                        <p>{product.description || "Бұл бургер ең үздік ингредиенттерден жасалған."}</p>
                    </div>

                    {/* Раздельная логика: Купить (добавить в корзину) */}
                    <button 
                        className="primary-action-btn"
                        onClick={() => {
                            addToCart({...product, quantity: 1});
                            alert("Тауар себетке қосылды!");
                        }}
                    >
                        Себетке қосу
                    </button>

                    {/* Раздельная логика: Оставить отзыв */}
                    <section className="product-comments-area">
                        <h3>Пікірлер ({comments.length})</h3>

                        <div className="comment-input-group">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Пікіріңізді қалдырыңыз..."
                            />
                            <button className="comment-submit-btn" onClick={handleAddComment}>
                                Қосу
                            </button>
                        </div>
                        
                        <div className="comments-feed">
                            {comments.length > 0 ? (
                                comments.map(item => (
                                    <div key={item.id} className="single-comment">
                                        <strong className="comment-author">{item.user}</strong>
                                        <p className="comment-body">{item.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Әлі пікірлер жоқ. Бірінші болып қалдырыңыз!</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;