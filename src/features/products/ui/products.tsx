import React, {useEffect} from 'react';
import s from './products.module.css'
import {CharacterType, rikAndMortiAPI} from "../api/productsApi";
import {useDispatch, useSelector} from "react-redux";
import {InitialState, setProducts} from "../model/productsSlice";
import {Card} from "../../../components/card/Card";

export const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        rikAndMortiAPI.getCharacter().then(
            result => {
                dispatch(setProducts(result.data))
            }
        )
    }, [dispatch]);

const products = useSelector<InitialState,CharacterType[]>(state => state.results);

return (
    <div className={s.container}>
<button>all</button>
<button>like</button>
        {products.length > 0 ? products.map((product: CharacterType) => {
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
;




