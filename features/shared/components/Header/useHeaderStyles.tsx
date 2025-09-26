import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 5,
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      borderBottomWidth: 2,
      borderBottomColor: theme === "dark" ? "#fff" : "#121212",
    },
    headerText: {
      fontSize: 20,
      fontWeight: 700,
      color: theme === "dark" ? "#fff" : "#28292D",
    },
  });
}
