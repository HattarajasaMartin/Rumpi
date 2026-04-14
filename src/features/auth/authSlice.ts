import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    username: string;
    full_name: string;
    email: string;
    bio?: string;
    followers: number;
    following: number;
    photo_profile?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

// Ambil data dari localStorage saat aplikasi pertama kali dimuat
const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken,
    isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user; // Simpan nama/foto ke Redux
            state.token = action.payload.token; // Simpan token ke Redux
            state.isAuthenticated = true; // Kasih tau kalau "Sudah Login"

            // Simpan ke storage agar awet
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => { // Untuk hapus hak akses 
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); // Hapus tokennya localStorage
            localStorage.removeItem('user'); // Hapus data user dari localStorage
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
    },
});

export const { setAuth, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;