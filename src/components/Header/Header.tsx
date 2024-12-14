import React from 'react';
import {NavLink} from "react-router-dom";
import s from './headerStyle.module.css'
export const Header = () => {
    return (
        <header className={s.header}>
            <h1 className='logo'>Rick & Morty <span className={s.blueColor}>WiKi</span></h1>
            <nav>
                <ul className={s.list}>

                    <li><NavLink className={({ isActive }) => isActive ? s.active : ''}  to={'/product'}>Product</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? s.active : ''} to={'/episode'}>Episode</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? s.active : ''} to={'/location'}>Location</NavLink></li>

                </ul>
            </nav>
        </header>
    );
};
