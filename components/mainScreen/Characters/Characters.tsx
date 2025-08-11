import React, { useEffect, useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { Character, fetchCharacters } from '../../../store/slices/charactersSlice';
import CharacterCard from '../CharacterItem/Item';
import useStyles from './useCharactersStyles';
import {RootState, useAppDispatch} from "@/store/index"


const MemoizedCharacterCard = React.memo(CharacterCard);

const Characters = () => {
  const dispatch = useAppDispatch();
  const {
    filteredCharacters,
    offlineCharacters,
    loading,
    hasMore,
    isOfflineMode 
  } = useSelector((state:RootState) => state.characters);

  const styles = useStyles();


  const displayData = isOfflineMode ? offlineCharacters : filteredCharacters;

    const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <MemoizedCharacterCard character={item} />,
    []
  );

  const uniqueCharacters = useMemo(() => {
    const seen = new Set();
    return displayData?.filter(char => {
      if (seen.has(char.id)) return false;
      seen.add(char.id);
      return true;
    });
  }, [displayData]); 

  useEffect(() => {
    if (!isOfflineMode) { 
      dispatch(fetchCharacters());
    }
  }, [dispatch, isOfflineMode]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && !isOfflineMode) { 
      dispatch(fetchCharacters());
    }
  }, [hasMore, loading, dispatch, isOfflineMode]);

  return (

      <FlatList
        data={uniqueCharacters}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={!isOfflineMode ? handleLoadMore : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading&&!isOfflineMode ? <ActivityIndicator size="large" /> : null}
        style={styles.containerCharacters}
      />


  );
};

export default Characters;

