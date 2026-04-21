import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
    const figmaStyle = "node-id=0-1&p=f&t=j8ESOqf0bnp3cd0s-0";

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to={`/?${figmaStyle}`} className="logo">
                    <h1>BAHANDI</h1>
                </Link>

                <nav className="nav-menu">
                    <Link to={`/categories/burgers?${figmaStyle}`} className="nav-link">БУРГЕРЫ</Link>
                    <Link to={`/categories/new?${figmaStyle}`} className="nav-link">НОВИНКИ</Link>
                    <Link to={`/categories/sale?${figmaStyle}`} className="nav-link">СКИДКИ</Link>
                </nav>

                <div className="header-actions">
                    <Link to={`/cart?${figmaStyle}`} className="nav-cart-btn">
                        КОРЗИНА <span className="cart-badge">({cartCount})</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;