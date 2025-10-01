import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import useStyles from './useFilterStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilter } from '../../hooks/useFilter';
import { IThemeColors } from '@/features/theme/types/theme.interfaces';

const statusOptions = ['', 'Alive', 'Dead', 'unknown'] as const;
const speciesOptions = ['', 'Human', 'Alien'] as const;

interface IFilterProps {
  themeColors: IThemeColors;
}
const Filters = ({ themeColors }: IFilterProps) => {
  const styles = useStyles(themeColors);
  const insets = useSafeAreaInsets();
  const {
    visibleFilter,
    selectedFilters,
    handleFilterSelect,
    applyFilters,
    resetAllFilters,
    setVisibleFilter,
  } = useFilter();

  const renderFilterModal = () => {
    if (!visibleFilter) return null;

    const options = visibleFilter === 'status' ? statusOptions : speciesOptions;
    const currentValue = selectedFilters[visibleFilter];

    return (
      <Modal
        isVisible={!!visibleFilter}
        onBackdropPress={() => setVisibleFilter(null)}
        style={[styles.modal, { marginTop: -insets.top }]}
        statusBarTranslucent={true}
      >
        <View style={[styles.modalContent, { paddingBottom: insets.bottom }]}>
          {options.map(option => (
            <TouchableOpacity
              key={option || 'empty'}
              style={[
                styles.filterOption,
                currentValue === option && styles.selectedFilterOption,
              ]}
              onPress={() => handleFilterSelect(visibleFilter, option)}
            >
              <Text style={styles.filterOptionText}>{option || 'All'}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={
                [
                  styles.filterButton,
                  styles.applyButton,
                ] as StyleProp<ViewStyle>
              }
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

export const CharacterFilter = React.memo(Filters);
