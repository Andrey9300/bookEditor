import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/book/all" className="nav-link">Книги</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/author/all" className="nav-link">Авторы</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/publisher/all" className="nav-link">Издатели</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;