import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  mode: 'light', // или 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      AsyncStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('theme', state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export const loadTheme = () => async (dispatch) => {
  const savedTheme = await AsyncStorage.getItem('theme');
  if (savedTheme) {
    dispatch(setTheme(savedTheme));
  }
};

export default themeSlice.reducer;