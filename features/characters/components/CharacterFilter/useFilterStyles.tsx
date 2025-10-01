import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import { StyleSheet } from 'react-native';

export default function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: themeColors.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    filterButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: themeColors.filterBackgroundColor,
      minWidth: 100,
      alignItems: 'center',
    },
    filterButtonText: {
      fontSize: 14,
      color: themeColors.textColor,
    },
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: themeColors.backgroundColor,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    filterOption: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderColor,
    },
    selectedFilterOption: {
      backgroundColor: themeColors.selectedFilter,
    },
    filterOptionText: {
      fontSize: 16,
      color: themeColors.textColor,
    },
    filterButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    applyButton: {
      backgroundColor: '#2196f3',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
    resetButton: {
      backgroundColor: '#f44336',
      padding: 10,
      borderRadius: 5,
      flex: 1,
    },
  });
}
