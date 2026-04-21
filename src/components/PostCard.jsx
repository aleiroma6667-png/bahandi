import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostCard = ({ item }) => {
    const navigate = useNavigate();

    const handleOpen = () => {
        // Переходим на страницу деталей и передаем данные карточки
        navigate('/product', { state: { data: item } });
    };

    return (
        <div></div>
    );
};

export default PostCard;