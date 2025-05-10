import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "./slices/themeSlice.js"
import charactersSlice from "./slices/charactersSlice.js"

export const store = configureStore({
  reducer: {

    theme:  themeReducer,
    characters:charactersSlice,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});