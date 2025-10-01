import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import { StyleSheet } from 'react-native';
export default function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 5,
      alignItems: 'center',
      backgroundColor: themeColors.backgroundColor,
      borderBottomWidth: 2,
      borderBottomColor: themeColors.borderColor,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 700,
      color: themeColors.textColor,
    },
  });
}
