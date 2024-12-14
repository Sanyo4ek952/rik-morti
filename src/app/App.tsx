import React from 'react';
import './App.css';
import {Products} from "../features/products/ui/products";

import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div className={'body'}>
                <Outlet/>
            </div>
            <Products/>
        </div>
    );
}

export default App;
