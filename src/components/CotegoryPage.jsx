import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = ({ addToCart }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- НОВОЕ: Состояния для модального окна ---
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [count, setCount] = useState(1);

    const { categoryName } = useParams();
    const navigate = useNavigate();

    const categoryTitles = {
        burgers: "Бургеры",
        new: "Новинки",
        sale: "Скидки"
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://8aefe87c60033c7c.mokky.dev/BAHANDI') // Используем твой основной эндпоинт
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filtered = categoryName
                        ? data.filter(item => item.category === categoryName)
                        : data;
                    setGames(filtered);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Деректерді алу қатесі:", err);
                setLoading(false);
            });
    }, [categoryName]);

    // Функция для очистки цены (чтобы считать сумму в модалке)
    const getCleanPrice = (price) => {
        return Number(String(price).replace(/[^0-9]/g, '')) || 0;
    };

    if (loading) return <h1 style={{ textAlign: 'center', marginTop: '100px', color: '#27AE60' }}>Загрузка...</h1>;

    return (
        <div className="main-content">
            <div className="category-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <button 
                    className="back-btn" 
                    onClick={() => navigate('/')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    ← Назад
                </button>
                <h2 className="page-title" style={{ margin: 0 }}>
                    {categoryTitles[categoryName] || categoryName}
                </h2>
            </div>
            
            <div className="grid-list">
                {games.length > 0 ? (
                    games.map(game => (
                        <div 
                            key={game.id} 
                            className="card" 
                            onClick={() => navigate(`/detail/${game.id}`)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-img-box">
                                <img src={game.image || game.img} alt={game.title} />
                            </div>
                            
                            <div className="card-content" style={{ padding: '15px', textAlign: 'left' }}>
                                <p className="card-title" style={{ color: '#718096', fontSize: '14px', marginBottom: '5px' }}>
                                    {game.title}
                                </p>
                                <h3 className="card-price" style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 15px 0' }}>
                                    {game.price} ₸
                                </h3>
                                
                                <button 
                                    className="add-to-cart-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        // ВМЕСТО ALERT ОТКРЫВАЕМ ОКНО
                                        setSelectedProduct(game);
                                        setCount(1);
                                    }}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#27AE60',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
                        <h3>В этой категории пока нет товаров</h3>
                        <button onClick={() => navigate('/')} style={{ color: '#27AE60', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                            Вернуться на главную
                        </button>
                    </div>
                )}
            </div>

            {/* --- МОДАЛЬНОЕ ОКНО --- */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        <div className="modal-content-flex">
                            <div className="modal-image-side">
                                <img src={selectedProduct.image || selectedProduct.img} alt={selectedProduct.title} />
                            </div>

                            <div className="modal-details-side">
                                <h2 className="modal-title">{selectedProduct.title}</h2>
                                <p className="product-meta">{selectedProduct.price} ₸ • {selectedProduct.weight || "260"} г</p>
                                <p className="modal-description">
                                    {selectedProduct.description || "Бургер с говяжьей котлетой, свежие овощи и фирменный соус."}
                                </p>

                                <div className="modal-controls">
                                    <div className="counter">
                                        <button onClick={() => count > 1 && setCount(count - 1)}>−</button>
                                        <span className="count-value">{count}</span>
                                        <button onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                    
                                    <button className="confirm-btn" onClick={() => {
                                        addToCart({ ...selectedProduct, quantity: count });
                                        setSelectedProduct(null);
                                    }}>
                                        Добавить | {(getCleanPrice(selectedProduct.price) * count).toLocaleString()} ₸
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;