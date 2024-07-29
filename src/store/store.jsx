import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './CategorySlice';
import sidebarReducer from './SideBarSlice';
import productReducer from './ProductSlice';
import cartReducer from './CartSlice';
import searchReducer from './SearchSlice';
import { apiSlice } from './ApiSlice';
import authReducer from './AuthSlice';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        sidebar: sidebarReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;