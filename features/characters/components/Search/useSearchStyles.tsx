import { RootState } from "@/store/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    searchView: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
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
      color: theme === "dark" ? "#fff" : "#000",
      backgroundColor: theme === "dark" ? "#28292D" : "#fff",
      marginVertical: 10,
    },
  });
}
