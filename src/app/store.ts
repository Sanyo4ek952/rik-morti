import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage
import { productsSlice } from '../features/products/model/productsSlice';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

// Конфигурация для redux-persist
const persistConfig = {
    key: 'root', // Ключ для хранения в localStorage
    storage, // Хранилище (localStorage)
    whitelist: ['products'], // Список редьюсеров, которые нужно сохранять
};

// Комбинируем редьюсеры
const rootReducer = combineReducers({
    products: productsSlice.reducer,
    // Добавьте другие редьюсеры, если они есть
});

// Оборачиваем редьюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Настраиваем store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Отключаем проверку на сериализуемость
        }),
});

// Создаем persistor для управления сохранением
export const persistor = persistStore(store);

// Типы для store
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
>;

// Для отладки в браузере
// @ts-ignore
window.store = store;