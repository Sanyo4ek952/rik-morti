import {AnyAction, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {productsSlice} from "../features/products/model/productsSlice";



export const store = configureStore({
    reducer: productsSlice.reducer,
});





// @ts-ignore
window.store = store;