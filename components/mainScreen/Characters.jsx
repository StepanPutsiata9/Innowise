import React, { useEffect, useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../store/slices/charactersSlice';
import CharacterCard from './Item';
import useThemeStyles from '@/hooks/useThemeStyles';


const MemoizedCharacterCard = React.memo(CharacterCard);

const Characters = () => {
  const dispatch = useDispatch();
  const { filteredCharacters, loading, hasMore } = useSelector(state => state.characters);
  const styles = useThemeStyles();


  const renderItem = useCallback(
    ({ item }) => <MemoizedCharacterCard character={item} />,
    []
  );
  const uniqueCharacters = useMemo(() => {
    const seen = new Set();
    return filteredCharacters.filter(char => {
      if (seen.has(char.id)) return false;
      seen.add(char.id);
      return true;
    });
  }, [filteredCharacters]);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchCharacters());
    }
  }, [hasMore, loading, dispatch]);

  return (
    <FlatList
      data={uniqueCharacters}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      style={styles.containerCharacters}
    />
  );
};

export default React.memo(Characters);