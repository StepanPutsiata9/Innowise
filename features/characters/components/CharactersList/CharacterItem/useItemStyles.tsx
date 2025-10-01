import { IThemeColors } from '@/features/theme/types/theme.interfaces';
import { StyleSheet } from 'react-native';
export default function useThemeStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: themeColors.cardBackgroundColor,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 2,
      width: '95%',
      marginHorizontal: 'auto',
      marginBottom: 20,
      borderWidth: 2,
      borderColor: themeColors.borderColor,
    },
    image: {
      width: 175,
      minHeight: 175,
    },
    info: {
      padding: 10,
      flex: 1,
      marginLeft: 10,
    },
    infoLine: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    name: {
      fontWeight: 'bold',
      color: themeColors.textColor,
      fontSize: 20,
      marginBottom: 10,
    },
    infoParams: {
      color: '#8b8b8b',
      fontWeight: 500,
      fontSize: 16,
      marginRight: 3,
    },
    infoText: {
      color: themeColors.textColor,
      fontWeight: 700,
      fontSize: 16,
    },
    dead: {
      width: 13,
      height: 13,
      backgroundColor: 'red',
      marginLeft: 5,
      borderRadius: 25,
    },
    alive: {
      width: 13,
      height: 13,
      backgroundColor: 'green',
      marginLeft: 5,
      borderRadius: 25,
    },
    unknown: {
      width: 13,
      height: 13,
      backgroundColor: 'grey',
      marginLeft: 5,
      borderRadius: 25,
    },
  });
}
