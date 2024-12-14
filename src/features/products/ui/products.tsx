import {useEffect, useState} from 'react';
import s from './products.module.css'
import {CharacterType, rikAndMortiAPI} from "../api/productsApi";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../model/productsSlice";
import {Card} from "../../../components/Card/Card";
import {AppRootStateType} from "../../../app/store";
import {Link, NavLink} from "react-router-dom";

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppRootStateType, CharacterType[]>(state => state.products.results);
    const [isLiked, setIsLiked] = useState(false);
    const filteredProducts = isLiked ? products.filter(el => el.like === true) : products;

    useEffect(() => {
        rikAndMortiAPI.getCharacter().then(
            result => {
                dispatch(setProducts(result.data.results))
            }
        )
    }, [dispatch]);
    console.log(filteredProducts)
    return (
        <>
            <div>
                <button className={s.button} disabled={!isLiked} onClick={() => setIsLiked(false)}>all</button>
                <button className={s.button} disabled={isLiked} onClick={() => setIsLiked(true)}>like</button>
                <Link to={'/create-product'}>Create Product</Link>
            </div>
            <div className={s.container}>

                {filteredProducts.length > 0 ? filteredProducts.map((product: CharacterType) => {
                    return (<NavLink key={product.id} to={`/products/${product.id}`}>
                        <Card imageUrl={product.image}
                              name={product.name}
                              location={product.location}
                              status={product.status}
                              item={product}/>
                    </NavLink>)
                }) : 'No character found'}
            </div>
        </>
    );
}




