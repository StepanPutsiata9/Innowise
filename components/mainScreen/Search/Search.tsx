import { View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import useStyles from "./useSearchStyles";
import { searchCharacter, searchCharactersAPI } from "../../../store/slices/charactersSlice";
import { RootState, useAppDispatch } from "@/store/index";
import { debounce } from "lodash";
import { useSelector } from "react-redux";

export default function Search() {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const searchQuery = useSelector((state:RootState) => state.characters.searchQuery);
  const [localQuery, setLocalQuery] = useState("");

  const debouncedSearch = debounce((query: string) => {
    if (query.trim()) {
      dispatch(searchCharactersAPI(query));
    }
  }, 500);

  const handleTextChange = (inputText: string) => {
    setLocalQuery(inputText);
    dispatch(searchCharacter(inputText));
    
    if (!inputText.trim()) {
      dispatch(searchCharactersAPI(""));
    } else {
      debouncedSearch(inputText);
    }
  };

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
      />
    </View>
  );
}