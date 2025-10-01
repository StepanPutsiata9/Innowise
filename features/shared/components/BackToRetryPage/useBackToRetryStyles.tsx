import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import { StyleSheet } from 'react-native';
export default function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    offlineBlockText: {
      fontSize: 18,
      color: themeColors.textColor,
      textAlign: 'center',
    },
    offlineBlock: {
      backgroundColor: themeColors.backgroundColor,
      paddingVertical: 20,
    },
  });
}
