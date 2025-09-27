// import React, { useCallback } from "react";
// import { FlatList, ListRenderItem, Text } from "react-native";
// import CharacterCard from "./CharacterItem/Item";
// import useStyles from "./useCharactersStyles";
// import { Character } from "../../types/character.interfaces";
// import { useCharacters } from "../../hooks/useCharacter";

// const MemoizedCharacterCard = React.memo(CharacterCard);

// const Characters = () => {
//   const styles = useStyles();
//   const { characters, emptyText, loadMoreCharacters } = useCharacters();

//   const renderItem: ListRenderItem<Character> = useCallback(
//     ({ item }) => <MemoizedCharacterCard character={item} />,
//     []
//   );

//   const renderEmptyComponent = useCallback(() => {
//     if (!emptyText) return null;
//     return <Text style={styles.noResultsText}>{emptyText}</Text>;
//   }, [emptyText, styles.noResultsText]);

//   return (
//     <FlatList
//       showsVerticalScrollIndicator={false}
//       data={characters}
//       renderItem={renderItem}
//       keyExtractor={(item) => `${item.id}`}
//       onEndReached={loadMoreCharacters}
//       onEndReachedThreshold={0.5}
//       style={styles.containerCharacters}
//       ListEmptyComponent={renderEmptyComponent}
//     />
//   );
// };

// export default React.memo(Characters);

import React, { useEffect, useCallback } from "react";
import { FlatList, ListRenderItem, Text } from "react-native";
import { useAppDispatch } from "@/store/store";
import { fetchCharacters } from "@/features/characters/store/charactersSlice";
import CharacterCard from "./CharacterItem/Item";
import useStyles from "./useCharactersStyles";
import { Character } from "../../types/character.interfaces";
import { useCharacters } from "../../hooks/useCharacter";

const MemoizedCharacterCard = React.memo(CharacterCard);

const Characters: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const {
    characters,
    handleLoadMore,
    emptyText,
    isOfflineMode,
    isSearching,
    searchQuery,
  } = useCharacters();

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <MemoizedCharacterCard character={item} />,
    []
  );

  const renderEmptyComponent = useCallback(() => {
    if (!emptyText) return null;
    return <Text style={styles.noResultsText}>{emptyText}</Text>;
  }, [emptyText, styles.noResultsText]);

  useEffect(() => {
    if (!isOfflineMode && !isSearching && !searchQuery) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, isOfflineMode, isSearching, searchQuery]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={characters}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      style={styles.containerCharacters}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export default React.memo(Characters);
