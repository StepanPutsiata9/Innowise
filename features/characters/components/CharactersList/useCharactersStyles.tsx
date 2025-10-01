import { IThemeColors } from "@/features/theme/types/theme.interfaces";
import { StyleSheet } from "react-native";

export default function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    containerCharacters: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
      paddingTop: 10,
    },
    noResultsText: {
      textAlign: "center",
      fontSize: 18,
      color: themeColors.textColor,
      marginBottom: 30,
    },
  });
}
