import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage
import {productsSlice} from '../features/products/model/productsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products'],
};

const rootReducer = combineReducers({
    products: productsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type AppRootStateType = ReturnType<typeof rootReducer>;
