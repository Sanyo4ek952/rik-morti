import React from 'react';
import './App.css';
import {Products} from "../features/products/ui/products";

import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";

function App() {
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
