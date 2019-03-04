import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
    <div className="alert alert-success" role="alert">
        Добро пожаловать в редактор книг! <Link to="/book/all">Список книг</Link>.
    </div>
);

export default Welcome;