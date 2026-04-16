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
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                Object.keys(action.payload).forEach((key) => {
                    const k = key as keyof User;
                    const value = action.payload[k];

                    if (typeof value === "function") {
                        // kalau value function (increment/decrement)
                        // @ts-ignore
                        state.user[k] = value(state.user[k]);
                    } else {
                        // kalau value biasa
                        // @ts-ignore
                        state.user[k] = value;
                    }
                });

                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },

        // 🔥 NEW: UPDATE FOLLOW COUNT
        updateFollowCount: (
            state,
            action: PayloadAction<{ type: "follow" | "unfollow" }>
        ) => {
            if (!state.user) return;

            if (action.payload.type === "follow") {
                state.user.following += 1;
            }

            if (action.payload.type === "unfollow") {
                state.user.following -= 1;
            }

            localStorage.setItem('user', JSON.stringify(state.user));
        },
    },
});

export const { setAuth, logout, updateUser, updateFollowCount } = authSlice.actions;
export default authSlice.reducer;