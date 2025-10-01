import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/features/theme/store/themeSlice';
import charactersSlice from '@/features/characters/store/charactersSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    characters: charactersSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
