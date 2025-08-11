import { RootState } from "@/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function useThemeStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    // for Item.jsx
    card: {
      flexDirection: "row",
      backgroundColor: theme === "dark" ? "#28292D" : "#fff",
      borderRadius: 16,
      overflow: "hidden",
      elevation: 2,
      width: "95%",
      marginHorizontal: "auto",
      marginBottom: 20,
      borderWidth: 2,
      borderColor: theme === "dark" ? "#fff" : "#28292D",
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
      flexDirection: "row",
      marginBottom: 3,
      alignItems: "center",
      flexWrap: "wrap",
    },
    name: {
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#28292D",
      fontSize: 20,
      marginBottom: 10,
    },
    infoParams: {
      color: theme === "dark" ? "#8b8b8b" : "#28292D",
      fontWeight: 500,
      fontSize: 16,
      marginRight: 3,
    },
    infoText: {
      color: theme === "dark" ? "#fff" : "#000",
      fontWeight: 700,
      fontSize: 16,
    },
    dead: {
      width: 13,
      height: 13,
      backgroundColor: "red",
      marginLeft: 5,
      borderRadius: 25,
    },
    alive: {
      width: 13,
      height: 13,
      backgroundColor: "green",
      marginLeft: 5,
      borderRadius: 25,
    },
    unknown: {
      width: 13,
      height: 13,
      backgroundColor: "grey",
      marginLeft: 5,
      borderRadius: 25,
    },
  });
}
