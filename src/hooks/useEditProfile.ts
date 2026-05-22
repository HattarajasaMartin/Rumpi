import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../features/auth/authSlice'; // reducer yang sudah ada
import { editProfileAPI } from '../features/auth/authService';

export function useEditProfile(onSuccess?: () => void) {
    const dispatch = useAppDispatch();

    // Ambil data user dari Redux sebagai nilai awal form
    const { user } = useAppSelector((state) => state.auth);

    // State form — diisi dengan data user yang sudah ada di Redux
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [photo, setPhoto] = useState<File | null>(null); // foto baru yang dipilih user
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError('');

            // Pakai FormData karena ada kemungkinan upload foto
            const formData = new FormData();
            formData.append('full_name', fullName);
            formData.append('username', username);
            formData.append('bio', bio);
            if (photo) formData.append('photo_profile', photo); // hanya kirim kalau ada foto baru

            // Kirim ke backend
            const response = await editProfileAPI(formData);

            // Update Redux dengan data terbaru dari backend
            dispatch(updateUser(response.user));

            // Update localStorage supaya data tidak hilang saat refresh
            const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...savedUser, ...response.user }));

            onSuccess?.(); // tutup modal kalau berhasil
        } catch (err: any) {
            setError(err.response?.data?.error || 'Gagal mengupdate profile!');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fullName, setFullName,
        username, setUsername,
        bio, setBio,
        photo, setPhoto,
        isLoading,
        error,
        handleSubmit,
    };
}
