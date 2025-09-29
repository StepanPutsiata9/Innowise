import React from "react";
import { View, TextInput } from "react-native";
import useStyles from "./useSearchStyles";
import { useSearch } from "../../hooks/useSearch";

const Search = () => {
  const styles = useStyles();
  const { localQuery, handleTextChange, placeholder } = useSearch();
  return (
    <View style={styles.searchView}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={handleTextChange}
        value={localQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default React.memo(Search);
