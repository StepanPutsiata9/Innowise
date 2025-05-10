import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.js';
import themeReducer from "./slices/themeSlice.js"
import charactersSlice from "./slices/charactersSlice.js"

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
    theme:  themeReducer,
    characters:charactersSlice,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});