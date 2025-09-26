import { View, TextInput } from "react-native";
import { useEffect, useState, useCallback } from "react";
import useStyles from "./useSearchStyles";
import {
  searchCharacter,
  searchCharactersAPI,
  endSearch,
} from "@/features/characters/store/charactersSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { debounce } from "lodash";
import { useSelector } from "react-redux";

export default function Search() {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const searchQuery = useSelector(
    (state: RootState) => state.characters.searchQuery,
  );
  const isSearching = useSelector(
    (state: RootState) => state.characters.isSearching,
  );
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        dispatch(searchCharactersAPI(query));
      }
    }, 500),
    [dispatch],
  );

  const handleTextChange = useCallback(
    (inputText: string) => {
      setLocalQuery(inputText);
      dispatch(searchCharacter(inputText));

      if (!inputText.trim()) {
        dispatch(endSearch());
        dispatch(searchCharactersAPI(""));
      } else {
        debouncedSearch(inputText);
      }
    },
    [dispatch, debouncedSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();

      if (isSearching) {
        dispatch(endSearch());
      }
    };
  }, [dispatch, debouncedSearch, isSearching]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.searchView}>
      <TextInput
        style={styles.input}
        placeholder="Search character in API by name"
        placeholderTextColor="#999"
        onChangeText={handleTextChange}
        value={localQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
