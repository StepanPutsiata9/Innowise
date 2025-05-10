import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  characters: [],
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      return {
        results: response.data.results,
        info: response.data.info,
        requestedPage: page
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.results;
        state.currentPage = action.payload.requestedPage;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;