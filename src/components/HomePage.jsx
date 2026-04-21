import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const HomePage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();
    const { categoryName } = useParams();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        let filter = '';
        if (categoryName === 'new') filter = '?isNew=true';
        else if (categoryName === 'sale') filter = '?isSale=true';
        else if (categoryName) filter = `?category=${categoryName}`;

        const url = `https://8aefe87c60033c7c.mokky.dev/BAHANDI${filter}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const sortedData = Array.isArray(data) ? data.sort((a, b) => a.id - b.id) : [];
                setProducts(sortedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка API:", err);
                setLoading(false);
            });
    }, [categoryName]);

    const getCleanPrice = (price) => price ? Number(String(price).replace(/[^0-9]/g, '')) : 0;

    if (loading) return <div className="loader">ЗАГРУЗКА...</div>;

    return (
        <div className="page-container home-page">
            <h2 className="page-title">
                {categoryName === 'burgers' ? "Бургеры" :
                 categoryName === 'new' ? "Новинки" :
                 categoryName === 'sale' ? "Скидки" : "Все товары"}
            </h2>

            <section className="product-grid">
                {products.length > 0 ? (
                    products.map(item => (
                        <article key={item.id} className="product-card">
                            <div className="card-preview" onClick={() => navigate(`/detail/${item.id}`)}>
                                <img src={item.image || item.img} alt={item.title} />
                            </div>
                            <div className="card-info">
                                <p className="product-name">{item.title}</p>
                                <h3 className="product-price">{item.price} ₸</h3>
                                <button className="add-btn" onClick={() => {
                                    setSelectedProduct(item);
                                    setCount(1);
                                }}>
                                    В корзину
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="empty-msg">В этой категории пока ничего нет.</p>
                )}
            </section>

            {/* Модальное окно */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        <div className="modal-layout">
                            <div className="modal-image-side">
                                <img src={selectedProduct.image || selectedProduct.img} alt={selectedProduct.title} />
                            </div>

                            <div className="modal-details-side">
                                <h2 className="modal-title">{selectedProduct.title}</h2>
                                <p className="modal-meta">{selectedProduct.price} ₸ • {selectedProduct.weight || "260"} г</p>
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

export default HomePage;