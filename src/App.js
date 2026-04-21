import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Импортируем новый хедер
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import DetailPage from './components/DetailPage';
import Footer from './components/Footer';
import './assets/style/style.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + (product.quantity || 1)} 
            : item
        );
      }
      return [...prev, {...product, quantity: product.quantity || 1}];
    });
  };

  // Вычисляем общее количество товаров для хедера
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Хедер теперь вынесен отдельно и получает количество товаров */}
        <Header cartCount={totalItems} />

        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/categories/:categoryName" element={<HomePage addToCart={addToCart} />} />
          <Route path="/detail/:id" element={<DetailPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;