import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                {/* Левая часть: Лого и копирайт */}
                <div className="footer-brand">
                    <h2 className="footer-logo">BAHANDI</h2>
                    <p className="footer-copyright">
                        © 2024 ТОО Баханди. Все права защищены
                    </p>
                </div>

                {/* Правая часть: Ссылки */}
                <div className="footer-links-group">
                    <h3 className="footer-title">Компания</h3>
                    <ul className="footer-list">
                        <li><a href="#!">Франшиза</a></li>
                        <li><a href="#!">Вакансии</a></li>
                        <li><a href="#!">Оферета</a></li>
                        <li><a href="#!">Политика конфиденциальности</a></li>
                        <li><a href="#!">Карта сайта</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



