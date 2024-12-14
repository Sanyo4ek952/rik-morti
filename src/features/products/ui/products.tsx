import {useEffect, useState} from 'react';
import s from './products.module.css'
import {CharacterType, rikAndMortiAPI} from "../api/productsApi";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../model/productsSlice";
import {Card} from "../../../components/Card/Card";
import {AppRootStateType} from "../../../app/store";

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

    return (
        <div className={s.container}>
            <button disabled={!isLiked} onClick={() => setIsLiked(false)}>all</button>
            <button disabled={isLiked} onClick={() => setIsLiked(true)}>like</button>
            {filteredProducts.length > 0 ? filteredProducts.map((product: CharacterType) => {
                return (<Card key={product.id}
                              imageUrl={product.image}
                              name={product.name}
                              location={product.location}
                              status={product.status}
                              item={product}
                />)
            }) : 'No character found'}
        </div>
    );
}




