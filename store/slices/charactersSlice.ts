import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin?: Location;
  location?: Location;
  image: string;
  episode?: string[];
  url?: string;
  created?: string;
}

interface IFilters {
  status: 'Alive' | 'Dead' | 'unknown' | '';
  species: string;
}

interface ICharactersState {
  characters: Character[] | null;
  selectedCharacter: Character | null;
  filteredCharacters: Character[] | null;
  isOfflineMode: boolean;
  offlineCharacters: Character[] | null;
  loading: boolean;
  error: string | null;
  nextPage: number;
  hasMore: boolean;
  filters: IFilters;
  searchQuery: string;
}

const initialState: ICharactersState = {
  characters: null,
  selectedCharacter: null,
  filteredCharacters: null,
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

const saveOfflineCharacters = async (characters: Character[]) => {
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
      return saved ? JSON.parse(saved) as Character[] : [];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

interface FetchCharactersResponse {
  characters: Character[];
  hasMore: boolean;
  isNewSearch: boolean;
}

export const fetchCharacters = createAsyncThunk<
  FetchCharactersResponse,
  void,
  { state: { characters: ICharactersState } }
>(
  'characters/fetchCharacters',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { nextPage, filters } = getState().characters;

      const params = new URLSearchParams();
      params.append('page', nextPage.toString());
      if (filters.status) params.append('status', filters.status.toLowerCase());
      if (filters.species) params.append('species', filters.species.toLowerCase());

      const response = await axios.get(`https://rickandmortyapi.com/api/character?${params.toString()}`);
      return {
        characters: response.data.results as Character[],
        hasMore: !!response.data.info.next,
        isNewSearch: nextPage === 1
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character | null>) => {
      state.selectedCharacter = action.payload;
    },
    searchCharacter: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      
      if (!action.payload) {
        state.filteredCharacters = state.characters;
        return;
      }

      const searchTerms = action.payload.toLowerCase().trim().split(/\s+/);
      if (state.characters) {
        state.filteredCharacters = state.characters.filter(character => {
          const fullName = character.name.toLowerCase();
          const nameWords = fullName.split(' ');
          return searchTerms.every(term =>
            nameWords.some(word => word.startsWith(term))
          );
        });
      }
    },
    setFilters: (state, action: PayloadAction<IFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
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
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOfflineMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<FetchCharactersResponse>) => {
        state.loading = false;

        const { characters, hasMore, isNewSearch } = action.payload;
        
        state.characters = isNewSearch 
          ? characters 
          : [...(state.characters || []), ...characters];

        const firstTenCharacters = state.characters?.slice(0, 10) || [];
        state.offlineCharacters = firstTenCharacters;
        saveOfflineCharacters(firstTenCharacters);

        if (state.searchQuery) {
          const searchTerms = state.searchQuery.toLowerCase().trim().split(/\s+/);
          state.filteredCharacters = state.characters?.filter(character => {
            const fullName = character.name.toLowerCase();
            const nameWords = fullName.split(' ');
            return searchTerms.every(term =>
              nameWords.some(word => word.startsWith(term))
            );
          }) || null;
        } else {
          state.filteredCharacters = state.characters;
        }

        state.nextPage += 1;
        state.hasMore = hasMore;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadOfflineCharacters.fulfilled, (state, action: PayloadAction<Character[]>) => {
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