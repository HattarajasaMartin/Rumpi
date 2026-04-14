import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Bentuk data yang disimpan di Redux untuk fitur likes
interface LikesState {
    likedThreads: Record<number, boolean>; // menyimpan status like per thread { threadId: isLiked }
    likeCounts: Record<number, number>;    // menyimpan jumlah like per thread { threadId: count }
}

// State awal saat aplikasi pertama kali dimuat (belum ada data like)
const initialState: LikesState = {
    likedThreads: {}, // buat nyimpen status like per thread
    likeCounts: {}, // buat nyimpen jumlah like per thread
};

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        // Checkpoint 1: Mengisi Redux dengan data likes dari hasil fetch atau socket
        // Dipanggil saat threads pertama kali dimuat atau thread baru masuk via socket
        initializeLikes(state, action: PayloadAction<{ threadId: number; isLiked: boolean; likeCount: number }[]>) {
            action.payload.forEach(({ threadId, isLiked, likeCount }) => {
                state.likedThreads[threadId] = isLiked;
                state.likeCounts[threadId] = likeCount;
            });
        },

        // Optimistic update — langsung flip status like di Redux
        // tanpa menunggu respons API, agar UI terasa instan
        toggleLike(state, action: PayloadAction<number>) { //dipanggil kalau user like/unlike
            const threadId = action.payload;
            const isCurrentlyLiked = state.likedThreads[threadId] ?? false;

            // Balik status like (true → false, false → true)
            state.likedThreads[threadId] = !isCurrentlyLiked;

            // Tambah atau kurangi count sesuai status baru
            state.likeCounts[threadId] = (state.likeCounts[threadId] ?? 0) + (isCurrentlyLiked ? -1 : 1);
        },

        // Rollback Redux ke state sebelumnya jika API call gagal
        // Mencegah UI menampilkan data yang tidak sinkron dengan database
        revertLike(state, action: PayloadAction<{ threadId: number; previousIsLiked: boolean; previousCount: number }>) {
            const { threadId, previousIsLiked, previousCount } = action.payload;
            state.likedThreads[threadId] = previousIsLiked;
            state.likeCounts[threadId] = previousCount;
        },
    },
});

export const { initializeLikes, toggleLike, revertLike } = likesSlice.actions;
export default likesSlice.reducer;