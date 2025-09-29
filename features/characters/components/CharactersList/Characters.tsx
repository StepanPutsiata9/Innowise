import React, { useCallback } from "react";
import { FlatList, ListRenderItem, Text } from "react-native";
import CharacterCard from "./CharacterItem/Item";
import useStyles from "./useCharactersStyles";
import { Character } from "../../types/character.interfaces";
import { useCharacters } from "../../hooks/useCharacters";

const MemoizedCharacterCard = React.memo(CharacterCard);

const Characters = () => {
  const styles = useStyles();
  const { characters, handleLoadMore, emptyText } = useCharacters();

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <MemoizedCharacterCard character={item} />,
    [],
  );

  const renderEmptyComponent = useCallback(() => {
    if (!emptyText) return null;
    return <Text style={styles.noResultsText}>{emptyText}</Text>;
  }, [emptyText, styles.noResultsText]);

  const keyExtractor = useCallback((item: Character) => `${item.id}`, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={characters}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      style={styles.containerCharacters}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export const CharactersList = React.memo(Characters);
