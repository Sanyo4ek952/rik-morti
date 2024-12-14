import React, {useEffect} from 'react';
import './App.css';

import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";
import {rikAndMortiAPI} from "../features/products/api/productsApi";
import {setProducts} from "../features/products/model/productsSlice";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        rikAndMortiAPI.getCharacter(1).then(
            result => {
                dispatch(setProducts(result.data.results))
            }
        )
    }, [dispatch]);
    return (
        <div className="App">
            <Header/>
            <div className={'body'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
