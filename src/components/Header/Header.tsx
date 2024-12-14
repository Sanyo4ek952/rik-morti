import React from 'react';
import s from './headerStyle.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
            <h1 className='logo'>Rick & Morty <span className={s.blueColor}>WiKi</span></h1>
        </header>
    );
};
