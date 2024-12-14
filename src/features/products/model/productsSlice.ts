import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialState = {
    info: {
        count: 826,
        pages: 42,
        next: "https://rickandmortyapi.com/api/character/?page=2",
        prev: null
    },
    results: []

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
        setProducts: (state, action: PayloadAction<InitialState>) => {
            return {...action.payload}
        }
    }
})

// Action creators are generated for each case reducer function
export const {setProducts} = productsSlice.actions

export default productsSlice.reducer