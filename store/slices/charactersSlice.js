import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  characters: [],
  selectedCharacter: {},
  filteredCharacters: [],
  loading: false,
  error: null,
  nextPage: 1,
  hasMore: true,
  filters: {
    status: '',
    species: ''
  },
  searchQuery: ''
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { nextPage, filters } = getState().characters;
      
      const params = new URLSearchParams();
      params.append('page', nextPage);
      if (filters.status) params.append('status', filters.status.toLowerCase());
      if (filters.species) params.append('species', filters.species.toLowerCase());
      
      const response = await axios.get(`https://rickandmortyapi.com/api/character?${params.toString()}`);
      return {
        characters: response.data.results,
        hasMore: !!response.data.info.next,
        isNewSearch: nextPage === 1
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
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    searchCharacter: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredCharacters = state.characters.filter(c => 
        c.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.nextPage = 1;
      state.hasMore = true;

    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.nextPage = 1;
      state.hasMore = true;

    },
    // Добавляем новый reducer для принудительного сброса
    clearCharacters: (state) => {
      state.characters = [];
      state.filteredCharacters = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload.isNewSearch) {
          state.characters = action.payload.characters;
        } else {
          state.characters = [...state.characters, ...action.payload.characters];
        }
        
        state.filteredCharacters = state.searchQuery
          ? state.characters.filter(c => 
              c.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
          : state.characters;
        
        state.nextPage += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setSelectedCharacter,
  searchCharacter,
  setFilters,
  resetFilters,
  clearCharacters
} = charactersSlice.actions;

export default charactersSlice.reducer;