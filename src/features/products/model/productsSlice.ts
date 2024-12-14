import {createSlice, current, PayloadAction} from '@reduxjs/toolkit'
import {CharacterType} from "../api/productsApi";

const initialState: InitialState = {
    info: {
        count: 826,
        pages: 42,
        next: "https://rickandmortyapi.com/api/character/?page=2",
        prev: null
    },
    results: [],

}
export type InitialState = {
    info: InitialStateInfo;
    results: any[];
}
export type InitialStateInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev?: any;
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<CharacterType[]>) => {
            return {...state, results: action.payload}
        },
        dellProduct: (state, action) => {
            return {...state, results: state.results.filter(el => el.id !== action.payload.id)}
        },
        setLikeProducts: (state, action) => {
            return {
                ...state,
                results: state.results.map(el => el.id === action.payload.id ? {...el, like: !el.like} : {...el})
            }
        },
        setProduct: (state, action) => {
            console.log(current(state.results))
              state.results.unshift(action.payload);
        },

    }
})

// Action creators are generated for each case reducer function
export const {setProducts, dellProduct, setLikeProducts,setProduct} = productsSlice.actions

export default productsSlice.reducer