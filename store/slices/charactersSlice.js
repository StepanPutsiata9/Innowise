import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  characters: [],
  selectedCharacter: {},
  filteredCharacters: [],
  isOfflineMode: false,
  offlineCharacters: [],
  loading: false,
  error: null,
  nextPage: 1,
  hasMore: true,
  filters: {
    status: '',
    species: '',
  },
  searchQuery: '',
};

const saveOfflineCharacters = async (characters) => {
  try {
    await AsyncStorage.setItem("offlineData", JSON.stringify(characters));
  } catch (error) {
    console.error('Failed to save offline characters:', error);
  }
};


export const loadOfflineCharacters = createAsyncThunk(
  'characters/loadOffline',
  async (_, { rejectWithValue }) => {
    try {
      const saved = await AsyncStorage.getItem("offlineData");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      if (!action.payload) {
        state.filteredCharacters = state.characters;
        return;
      }
      const searchTerms = action.payload.toLowerCase().trim().split(/\s+/);
      state.filteredCharacters = state.characters.filter(character => {
        const fullName = character.name.toLowerCase();
        const nameWords = fullName.split(' ');
        return searchTerms.every(term =>
          nameWords.some(word => word.startsWith(term))
        );

      });

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
    clearCharacters: (state) => {
      state.characters = [];
      state.filteredCharacters = [];
    },
    setOfflineMode: (state, action) => {
      state.isOfflineMode = action.payload;
    },
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

        // Сохраняем первые 10 персонажей
        const firstTenCharacters = state.characters.slice(0, 10);
        state.offlineCharacters = firstTenCharacters;
        saveOfflineCharacters(firstTenCharacters);

        state.filteredCharacters = state.searchQuery
          ? state.characters.filter(character => {
            character.name.toLowerCase();
            const nameWords = fullName.split(' ');

            
            return searchTerms.every(term =>
              nameWords.some(word => word.startsWith(term))
            )
          })
          : state.characters;
        state.nextPage += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadOfflineCharacters.fulfilled, (state, action) => {
        state.offlineCharacters = action.payload;
      });
  }
});

export const {
  setSelectedCharacter,
  searchCharacter,
  setFilters,
  resetFilters,
  clearCharacters,
  setOfflineMode
} = charactersSlice.actions;

export default charactersSlice.reducer;