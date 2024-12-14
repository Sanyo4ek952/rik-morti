import React from 'react';
import s from "../Card/cardStyle.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CharacterType} from "../../features/products/api/productsApi";

export const ProductItem = () => {
    const {id} = useParams();
    const products = useSelector<AppRootStateType, CharacterType[]>(state => state.products.results);
    const product = products.find(p => p.id === Number(id));
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <button onClick={goBack}>Back</button>
            <div>
                <img src={product.image} className={s.image} alt="1"/>
                <div className={s.name}>Name:{product.name}</div>
                <div className={s.location}>Last location:</div>
                <div className={s.location}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                    accusantium atque reprehenderit saepe sint vero!
                </div>
            </div>
        </>
    );
};
