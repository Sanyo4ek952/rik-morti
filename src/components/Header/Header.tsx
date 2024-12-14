import React from 'react';
import s from './headerStyle.module.css'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header className={s.header}>
            <Link to={'/products'}>
            <h1 className='logo'>Rick & Morty <span className={s.blueColor}>WiKi</span></h1>
            </Link>
        </header>
    );
};
