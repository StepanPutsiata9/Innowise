import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.js'; // Пример слайса

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Подключаем редюсер
    // ... другие редюсеры
  },
});