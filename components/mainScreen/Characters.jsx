import React, { useEffect,memo } from 'react';
import { 
  FlatList, 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, setCurrentPage } from '../../store/slices/charactersSlice';
import CharacterCard from './Item';
import useThemeStyles from '@/hooks/useThemeStyles';

const Characters = () => {
  const dispatch = useDispatch();
  const styles=useThemeStyles();
  const { 
    characters, 
    currentPage, 
    filteredCharacters,
    totalPages, 
    loading, 
    error 
  } = useSelector(state => state.characters);
  const MemoizedCharacterCard = memo(CharacterCard);
  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  };


  const renderItem = ({ item }) => <MemoizedCharacterCard character={item} />;

  // Рендер пагинации
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 3) {
      pages.push(
        <TouchableOpacity 
          key="first" 
          style={styles.pageButton} 
          onPress={() => goToPage(1)}
        >
          <Text>1</Text>
        </TouchableOpacity>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity 
          key={i}
          style={[
            styles.pageButton,
            currentPage === i && styles.activePageButton
          ]} 
          onPress={() => goToPage(i)}
        >
          <Text style={currentPage === i && styles.activePageText}>{i}</Text>
        </TouchableOpacity>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <TouchableOpacity 
          key="last" 
          style={styles.pageButton} 
          onPress={() => goToPage(totalPages)}
        >
          <Text>{totalPages}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paginationContainer}
      >
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={[styles.prevNext,currentPage === 1 && styles.disabledText]}>{"Prev"}</Text>
        </TouchableOpacity>
        
        {pages}
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={[styles.prevNext,currentPage === totalPages && styles.disabledText]}>{"Next"}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(fetchCharacters(currentPage))}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.containerCharacters}>
      {loading && currentPage === 1 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <>
              {loading && <ActivityIndicator size="small" />}
              {renderPagination()}
              <View style={styles.paginationInfo}>
                <Text style={styles.paginationInfoText}>
                  Page {currentPage} of {totalPages}
                </Text>
              </View>
            </>
          }
        />
      )}
    </View>
  );
};



export default Characters;