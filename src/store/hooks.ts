import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Современный способ типизации без сложного TypedUseSelectorHook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T) => useSelector(selector);