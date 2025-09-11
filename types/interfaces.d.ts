 interface Location {
  name: string;
  url: string;
}

 interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin?: Location;
  location?: Location;
  image: string;
  episode?: string[];
  url?: string;
  created?: string;
}

interface IFilters {
  status: "Alive" | "Dead" | "unknown" | "";
  species: string;
}

interface FetchCharactersResponse {
  characters: Character[];
  hasMore: boolean;
  isNewSearch: boolean;
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
  isSearching: boolean;
}




interface IthemeState{
  mode:"light"|"dark"
}
