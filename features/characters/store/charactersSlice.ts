import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    status: "",
    species: "",
  },
  searchQuery: "",
  isSearching: false,
};

const saveOfflineCharacters = async (characters: Character[]) => {
  try {
    await AsyncStorage.setItem("offlineData", JSON.stringify(characters));
  } catch (error) {
    console.error("Failed to save offline characters:", error);
  }
};

export const loadOfflineCharacters = createAsyncThunk(
  "characters/loadOffline",
  async (_, { rejectWithValue }) => {
    try {
      const saved = await AsyncStorage.getItem("offlineData");
      return saved ? (JSON.parse(saved) as Character[]) : [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);


const applyFilters = (characters: Character[], filters: IFilters): Character[] => {
  return characters.filter(character => {
    const matchesStatus = !filters.status || 
      character.status.toLowerCase() === filters.status.toLowerCase();
    const matchesSpecies = !filters.species || 
      character.species.toLowerCase().includes(filters.species.toLowerCase());
    return matchesStatus && matchesSpecies;
  });
};

export const fetchCharacters = createAsyncThunk<
  FetchCharactersResponse,
  void,
  { state: { characters: ICharactersState } }
>("characters/fetchCharacters", async (_, { getState, rejectWithValue }) => {
  try {
    const { nextPage, filters } = getState().characters;
    const params = new URLSearchParams();
    
    params.append("page", nextPage.toString());
    if (filters.status) params.append("status", filters.status.toLowerCase());
    if (filters.species) params.append("species", filters.species.toLowerCase());

    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?${params.toString()}`
    );
    
    return {
      characters: response.data.results as Character[],
      hasMore: !!response.data.info.next,
      isNewSearch: nextPage === 1,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const searchCharactersAPI = createAsyncThunk<
  FetchCharactersResponse,
  string,
  { state: { characters: ICharactersState } }
>("characters/searchCharactersAPI", async (query, { getState, rejectWithValue }) => {
  try {
    const { filters } = getState().characters;
    const params = new URLSearchParams();
    
    params.append("name", query);
    if (filters.status) params.append("status", filters.status.toLowerCase());
    if (filters.species) params.append("species", filters.species.toLowerCase());

    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?${params.toString()}`
    );
    
    return {
      characters: response.data.results as Character[],
      hasMore: !!response.data.info.next,
      isNewSearch: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          characters: [],
          hasMore: false,
          isNewSearch: true,
        };
      }
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character | null>) => {
      state.selectedCharacter = action.payload;
    },
    
    searchCharacter: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.isSearching = !!action.payload;
      state.nextPage = 1;
      
      if (!action.payload) {
        state.filteredCharacters = state.characters 
          ? applyFilters(state.characters, state.filters)
          : null;
        state.isSearching = false;
      }
    },
    
    setFilters: (state, action: PayloadAction<IFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.nextPage = 1;
      state.hasMore = true;
      
      if (state.characters) {
        state.filteredCharacters = applyFilters(state.characters, state.filters);
      }
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.nextPage = 1;
      state.hasMore = true;
      
      state.filteredCharacters = state.characters;
    },
    
    clearCharacters: (state) => {
      state.characters = [];
      state.filteredCharacters = [];
    },
    
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOfflineMode = action.payload;
    },
    
    resetSearch: (state) => {
      state.searchQuery = "";
      state.isSearching = false;
      state.filteredCharacters = state.characters 
        ? applyFilters(state.characters, state.filters)
        : null;
    },
    
    endSearch: (state) => {
      state.isSearching = false;
      state.searchQuery = "";
      state.filteredCharacters = state.characters 
        ? applyFilters(state.characters, state.filters)
        : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<FetchCharactersResponse>) => {
          state.loading = false;
          const { characters, hasMore, isNewSearch } = action.payload;

          state.characters = isNewSearch
            ? characters
            : [...(state.characters || []), ...characters];

          state.filteredCharacters = applyFilters(state.characters, state.filters);

          if (isNewSearch) {
            const firstTenCharacters = characters.slice(0, 10);
            state.offlineCharacters = firstTenCharacters;
            saveOfflineCharacters(firstTenCharacters);
          }

          state.nextPage += 1;
          state.hasMore = hasMore;
        }
      )
      .addCase(searchCharactersAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchCharactersAPI.fulfilled,
        (state, action: PayloadAction<FetchCharactersResponse>) => {
          state.loading = false;
          const { characters, hasMore } = action.payload;

          state.filteredCharacters = applyFilters(characters, state.filters);
          state.hasMore = hasMore;
        }
      )
      .addCase(searchCharactersAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.filteredCharacters = [];
      })
      .addCase(
        loadOfflineCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.offlineCharacters = action.payload;
          if (state.isOfflineMode) {
            state.filteredCharacters = applyFilters(action.payload, state.filters);
          }
        }
      );
  },
});

export const {
  setSelectedCharacter,
  searchCharacter,
  setFilters,
  resetFilters,
  clearCharacters,
  setOfflineMode,
  resetSearch,
  endSearch,
} = charactersSlice.actions;

export default charactersSlice.reducer;