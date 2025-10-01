import React from 'react';
import { View, TextInput } from 'react-native';
import { useSearch } from '../../hooks/useSearch';
import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import useStyles from './useSearchStyles';

interface ISearchProps {
  themeColors: IThemeColors;
}

const Search = ({ themeColors }: ISearchProps) => {
  const styles = useStyles(themeColors);
  const { localQuery, handleTextChange, placeholder } = useSearch();
  return (
    <View style={styles.searchView}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onChangeText={handleTextChange}
        value={localQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export const CharacterSearch = React.memo(Search);
