import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Hook pengganti useDispatch yang sudah mengetahui tipe AppDispatch
// Dipakai untuk memanggil action Redux (dispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook pengganti useSelector yang sudah mengetahui tipe RootState
// Dipakai untuk mengambil data dari Redux store dengan type-safe
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;