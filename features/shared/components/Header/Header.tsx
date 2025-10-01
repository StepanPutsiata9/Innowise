import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import useStyles from './useHeaderStyles';

interface IHeaderProps {
  themeColors: IThemeColors;
}
export const Header = ({ themeColors }: IHeaderProps) => {
  const styles = useStyles(themeColors);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Text style={styles.headerText}>The Rick and Morty App</Text>
    </View>
  );
};
