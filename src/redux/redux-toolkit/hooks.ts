import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * ============================================================================
 * ⚡ TYPED REDUX HOOKS
 * ============================================================================
 * Use throughout your app instead of plain `useDispatch` and `useSelector`.
 * This gives you complete TypeScript auto-completion for your Redux state!
 * ============================================================================
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
