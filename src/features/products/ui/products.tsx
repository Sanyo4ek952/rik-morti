import React, {useEffect} from 'react';
import s from './products.module.css'
import {CharacterType, rikAndMortiAPI} from "../api/productsApi";
import {useDispatch, useSelector} from "react-redux";
import {InitialState, setProducts} from "../model/productsSlice";

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

        {products.length > 0 ? products.map((product: CharacterType) => {
            return (<Card key={character.id}
                          imageUrl={character.image}
                          name={character.name}
                          location={character.location}
                          status={character.status}
                          item={character}
            />)
        }) : 'No character found'}
    </div>
);
}
;




