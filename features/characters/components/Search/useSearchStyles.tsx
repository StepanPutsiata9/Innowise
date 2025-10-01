import { IThemeColors } from "@/features/theme/types/theme.interfaces";
import { StyleSheet } from "react-native";
export default function useStyles(themeColors: IThemeColors) {
  return StyleSheet.create({
    searchView: {
      backgroundColor: themeColors.backgroundColor,
    },
    input: {
      height: 45,
      width: "95%",
      marginHorizontal: "auto",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: themeColors.textColor,
      backgroundColor: themeColors.searchBackgroundColor,
      marginVertical: 10,
    },
  });
}
