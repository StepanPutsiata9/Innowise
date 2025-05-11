import React, { useEffect,memo,useCallback} from 'react';
import { 
  FlatList, 

  ActivityIndicator, 

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters,  } from '../../store/slices/charactersSlice';
import CharacterCard from './Item';
import useThemeStyles from '@/hooks/useThemeStyles';


const Characters = () => {
  const dispatch = useDispatch();
  const { filteredCharacters, loading, hasMore } = useSelector(state => state.characters);
  const styles=useThemeStyles();
  // Первая загрузка
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  // Подгрузка при скролле
  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchCharacters());
    }
  }, [hasMore, loading, dispatch]);
  const MemoCharacterCard=memo(CharacterCard);
  return (
    <FlatList
      style={styles.containerCharacters}
      data={filteredCharacters}
      renderItem={({ item }) => <MemoCharacterCard character={item}  />}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" /> : null
      }
    />
  );
};

export default Characters;