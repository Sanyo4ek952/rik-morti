import {AnyAction, combineReducers, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {productsSlice} from "../features/products/model/productsSlice";

const rootReducer = combineReducers({
    products:productsSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
});



export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;