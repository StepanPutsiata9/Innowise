import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { setFilters, resetFilters, clearCharacters, fetchCharacters } from '../../../store/slices/charactersSlice';
import Modal from 'react-native-modal';
import useStyles from './useFilterStyles';
import { useAppDispatch } from "@/store/index";

type FilterType = 'status' | 'species';

interface FilterValues {
  status: 'Alive' | 'Dead' | 'unknown' | '';
  species: string;
}

const statusOptions = ['', 'Alive', 'Dead', 'unknown'] as const;
const speciesOptions = ['', 'Human', 'Alien'] as const;

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  
  const [visibleFilter, setVisibleFilter] = useState<FilterType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    status: '',
    species: ''
  });

  const handleFilterSelect = (filterType: FilterType, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    dispatch(clearCharacters()); 
    dispatch(setFilters(selectedFilters)); 
    dispatch(fetchCharacters());
    setVisibleFilter(null);
  };

  const resetAllFilters = () => {
    dispatch(clearCharacters());
    dispatch(resetFilters());
    dispatch(fetchCharacters());
    setSelectedFilters({ status: '', species: '' });
    setVisibleFilter(null);
  };

  const renderFilterModal = () => {
    if (!visibleFilter) return null;
    
    const options = visibleFilter === 'status' ? statusOptions : speciesOptions;
    const currentValue = selectedFilters[visibleFilter];

    return (
      <Modal
        isVisible={!!visibleFilter}
        onBackdropPress={() => setVisibleFilter(null)}
        style={styles.modal as StyleProp<ViewStyle>}
      >
        <View style={styles.modalContent as StyleProp<ViewStyle>}>
          {options.map((option) => (
            <TouchableOpacity
              key={option || 'empty'}
              style={[
                styles.filterOption as StyleProp<ViewStyle>,
                currentValue === option && (styles.selectedFilterOption as StyleProp<ViewStyle>)
              ]}
              onPress={() => handleFilterSelect(visibleFilter, option)}
            >
              <Text style={styles.filterOptionText as StyleProp<TextStyle>}>
                {option || 'All'}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.filterButtons as StyleProp<ViewStyle>}>
            <TouchableOpacity
              style={[styles.filterButton, styles.applyButton] as StyleProp<ViewStyle>}
              onPress={applyFilters}
            >
              <Text style={styles.filterButtonText as StyleProp<TextStyle>}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, styles.resetButton] as StyleProp<ViewStyle>}
              onPress={resetAllFilters}
            >
              <Text style={styles.filterButtonText as StyleProp<TextStyle>}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.filterContainer as StyleProp<ViewStyle>}>
      <TouchableOpacity
        style={styles.filterButton as StyleProp<ViewStyle>}
        onPress={() => setVisibleFilter('status')}
      >
        <Text style={styles.filterButtonText as StyleProp<TextStyle>}>
          {selectedFilters.status || 'Status'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.filterButton as StyleProp<ViewStyle>}
        onPress={() => setVisibleFilter('species')}
      >
        <Text style={styles.filterButtonText as StyleProp<TextStyle>}>
          {selectedFilters.species || 'Species'}
        </Text>
      </TouchableOpacity>

      {renderFilterModal()}
    </View>
  );
};

export default React.memo(Filters);