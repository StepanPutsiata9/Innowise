import React, { useEffect } from 'react';
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

const Characters = () => {
  const dispatch = useDispatch();
  const { 
    characters, 
    currentPage, 
    totalPages, 
    loading, 
    error 
  } = useSelector(state => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage, dispatch]);


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  };


  const renderItem = ({ item }) => <CharacterCard character={item} />;

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
          <Text style={currentPage === 1 && styles.disabledText}>{"Prev"}</Text>
        </TouchableOpacity>
        
        {pages}
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={currentPage === totalPages && styles.disabledText}>{"Next"}</Text>
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
    <View style={styles.container}>
      {loading && currentPage === 1 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <>
              {loading && <ActivityIndicator size="small" />}
              {renderPagination()}
              <View style={styles.paginationInfo}>
                <Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:'auto',
    marginVertical:10,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
  activePageText: {
    color: '#fff',
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 5,
  },
  disabledText: {
    color: '#ccc',
  },
  paginationInfo: {
    alignItems: 'center',
    paddingBottom: 15,
  },
});

export default Characters;