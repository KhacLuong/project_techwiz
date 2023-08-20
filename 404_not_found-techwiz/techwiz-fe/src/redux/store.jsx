import thunk from "redux-thunk";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.jsx";
import categorySlice from "./slices/categorySlice.jsx";
import brandSlice from "./slices/brandSlice.jsx";
import typeSlice from "./slices/typeSlice.jsx";
import productSlice from "./slices/productSlice.jsx";
import wishListSlice from "./slices/wishListSlice.jsx";
import userSlice from "./slices/userSlice.jsx";

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage: storage,
    whitelist: ['account', 'isAuthenticated'],
};
const rootReducerWithPersistence = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
    reducer: {
        category: categorySlice,
        brand: brandSlice,
        type: typeSlice,
        product: productSlice,
        wishlist: wishListSlice,
        user: userSlice,
        auth: rootReducerWithPersistence
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk)
})

export let persistor = persistStore(store);