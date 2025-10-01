import { StyleSheet } from "react-native";
import { IThemeColors } from "../../types/theme.interfaces";
export function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: themeColors.backgroundColor,
    },

    text: {
      color: themeColors.textColor,
      fontSize: 18,
    },
    changeThemeBtn: {
      backgroundColor: themeColors.backgroundColor,
      paddingHorizontal: 50,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: themeColors.borderColor,
    },
    logoView: {
      marginBottom: 20,
    },
  });
}
