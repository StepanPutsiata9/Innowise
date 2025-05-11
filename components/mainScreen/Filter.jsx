import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setFilters, resetFilters,clearCharacters,fetchCharacters } from '../../store/slices/charactersSlice';
import Modal from 'react-native-modal';
import useThemeStyles from '../../hooks/useThemeStyles';

const Filters = () => {
   const dispatch = useDispatch();
  
 
  const styles = useThemeStyles();
  const [visibleFilter, setVisibleFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    species: ''
  });

  const statusOptions = ['', 'Alive', 'Dead', 'Unknown'];
  const speciesOptions = ['', 'Human', 'Alien'];

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

   const applyFilters = () => {
    dispatch(clearCharacters()); // Сначала очищаем
    dispatch(setFilters(selectedFilters)); // Затем устанавливаем фильтры
    dispatch(fetchCharacters()); // И загружаем данные
    setVisibleFilter(null);
  };

  const resetAllFilters = () => {
    dispatch(clearCharacters()); // Сначала очищаем
    dispatch(resetFilters()); // Затем сбрасываем фильтры
    dispatch(fetchCharacters()); // И загружаем данные
    setSelectedFilters({ status: '', species: '' });
    setVisibleFilter(null);
  };
  const renderFilterModal = () => {
    const options = visibleFilter === 'status' ? statusOptions : speciesOptions;
    const currentValue = selectedFilters[visibleFilter];

    return (
      <Modal
        isVisible={!!visibleFilter}
        onBackdropPress={() => setVisibleFilter(null)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {options.map((option) => (
            <TouchableOpacity
              key={option || 'empty'}
              style={[
                styles.filterOption,
                currentValue === option && styles.selectedFilterOption
              ]}
              onPress={() => handleFilterSelect(visibleFilter, option)}
            >
              <Text style={styles.filterOptionText}>{option || 'All'}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, styles.applyButton]}
              onPress={applyFilters}
            >
              <Text style={styles.filterButtonText}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, styles.resetButton]}
              onPress={resetAllFilters}
            >
              <Text style={styles.filterButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisibleFilter('status')}
      >
        <Text style={styles.filterButtonText}>
          {selectedFilters.status || 'Status'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisibleFilter('species')}
      >
        <Text style={styles.filterButtonText}>
          {selectedFilters.species || 'Species'}
        </Text>
      </TouchableOpacity>
      
      {renderFilterModal()}
    </View>
  );
};

export default Filters;