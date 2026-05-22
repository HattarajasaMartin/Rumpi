import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import likesReducer from '../features/likes/likeSlice'; // reducer untuk manajemen state likes

export const store = configureStore({
    reducer: {
        auth: authReducer,   // mengelola state autentikasi (login, logout, user)
        likes: likesReducer, // mengelola state likes (status like & jumlah like per thread)
    },
});

// Tipe RootState diambil otomatis dari store, dipakai di useAppSelector
export type RootState = ReturnType<typeof store.getState>;

// Tipe AppDispatch diambil dari store, dipakai di useAppDispatch
export type AppDispatch = typeof store.dispatch;
