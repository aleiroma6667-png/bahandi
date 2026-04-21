import React, { useState } from 'react'; // ОБЯЗАТЕЛЬНО: Добавлен useState

const CartPage = ({ cart, setCart }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Расчет общей суммы
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/[^0-9]/g, '')) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + (price * qty);
  }, 0);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleConfirmOrder = () => {
    alert("Тапсырыс қабылданды!");
    setCart([]);
    setIsOrderModalOpen(false);
  };

  return (
    <div className="main-content">
      <h2 className="page-title">Ваша корзина</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart" style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Корзина бос... Тауар таңдаңыз.</p>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div key={item.id} className="card" style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px',
              padding: '20px',
              display: 'flex',
              background: '#fff',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <img 
                  src={item.image || item.img} 
                  alt={item.title} 
                  style={{width: '100px', height: '80px', objectFit: 'cover', borderRadius: '15px'}} 
                />
                <div>
                  <h4 style={{margin: '0 0 5px 0'}}>{item.title}</h4>
                  <p style={{margin: 0, fontWeight: 'bold', color: '#27ae60'}}>
                    {Number(String(item.price).replace(/[^0-9]/g, '')).toLocaleString()} ₸ × {item.quantity}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)} 
                className="close-x" 
                style={{position: 'static', border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px'}}
              >
                &times;
              </button>
            </div>
          ))}

          <div style={{marginTop: '40px', textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px'}}>
            <h3 style={{fontSize: '24px'}}>Итого: {totalPrice.toLocaleString()} ₸</h3>
            <button 
              className="confirm-btn" 
              onClick={() => setIsOrderModalOpen(true)}
              style={{ 
                marginTop: '20px', 
                width: '250px', 
                padding: '15px', 
                backgroundColor: '#27ae60', 
                color: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ОФОРМЛЕНИЯ */}
      {isOrderModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 1000
        }} onClick={() => setIsOrderModalOpen(false)}>
          
          <div className="modal-card" style={{
            background: 'white', padding: '40px', borderRadius: '25px',
            position: 'relative', width: '90%', maxWidth: '400px', textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsOrderModalOpen(false)} 
              style={{position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer'}}>
              &times;
            </button>

            <h2 style={{marginBottom: '10px'}}>Оформление</h2>
            <p style={{color: '#666', marginBottom: '20px'}}>Растау үшін түймені басыңыз:</p>
            
            <div style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#27ae60'}}>
              {totalPrice.toLocaleString()} ₸
            </div>

            <button 
              className="confirm-btn" 
              onClick={handleConfirmOrder}
              style={{ 
                width: '100%', padding: '15px', backgroundColor: '#27ae60', 
                color: 'white', border: 'none', borderRadius: '12px', 
                fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' 
              }}
            >
              Растау және Сатып алу
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;