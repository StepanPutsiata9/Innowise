import React, { useEffect, useMemo, useCallback } from "react";
import {
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import {
  Character,
  fetchCharacters,
} from "../../../store/slices/charactersSlice";
import CharacterCard from "../CharacterItem/Item";
import useStyles from "./useCharactersStyles";
import { RootState, useAppDispatch } from "@/store/index";

const MemoizedCharacterCard = React.memo(CharacterCard);


const Characters = () => {
  const dispatch = useAppDispatch();
  const {
    filteredCharacters,
    offlineCharacters,
    loading,
    hasMore,
    isOfflineMode,
    isSearching,
    searchQuery,
  } = useSelector((state: RootState) => state.characters);

  const styles = useStyles();

  const displayData = isOfflineMode ? offlineCharacters : filteredCharacters;

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <MemoizedCharacterCard character={item} />,
    []
  );

  const uniqueCharacters = useMemo(() => {
    if (!displayData) return [];
    const seen = new Set();
    return displayData.filter((char) => {
      if (seen.has(char.id)) return false;
      seen.add(char.id);
      return true;
    });
  }, [displayData]);

  useEffect(() => {
    if (!isOfflineMode && !isSearching && !searchQuery) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, isOfflineMode, isSearching, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && !isOfflineMode && !isSearching) {
      dispatch(fetchCharacters());
    }
  }, [hasMore, loading, dispatch, isOfflineMode, isSearching]);

  const listFooterComponent = useMemo(() => {
    if (isOfflineMode) return null;
    if (isSearching && !hasMore && searchQuery) {
      return (
        <Text style={styles.noResultsText}>
          No more results for "{searchQuery}"
        </Text>
      );
    }
    return loading ? <ActivityIndicator size="large" /> : null;
  }, [loading, isOfflineMode, isSearching, hasMore, searchQuery, styles]);

  const renderEmptyComponent = useCallback(() => {
    if (loading) return null;
    return (
      <Text style={styles.noResultsText}>
        {isSearching
          ? `No characters found for "${searchQuery}"`
          : "No characters available"}
      </Text>
    );
  }, [loading, isSearching, searchQuery, styles.noResultsText]);
  
  return (
    <FlatList
      data={uniqueCharacters}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      style={styles.containerCharacters}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export default React.memo(Characters);
