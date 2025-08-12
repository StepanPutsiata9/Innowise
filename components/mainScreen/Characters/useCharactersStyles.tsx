import { RootState } from "@/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    containerCharacters: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      paddingTop: 10,
    },
    listContent: {
      padding: 5,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    prevNext: {
      color: theme === "dark" ? "#fff" : "#28292D",
    },
    error: {
      color: "red",
      marginBottom: 20,
    },
    loader: {
      marginTop: 20,
    },
    retryButton: {
      padding: 10,
      backgroundColor: "#ddd",
      borderRadius: 5,
    },
    paginationContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: "auto",
      marginVertical: 10,
    },
    pageButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginHorizontal: 2,
      borderRadius: 4,
      backgroundColor: theme === "dark" ? "#8b8b8b" : "#eee",
    },
    activePageButton: {
      backgroundColor: "#007bff",
    },
    activePageText: {
      color: "#fff",
    },
    navButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginHorizontal: 5,
    },
    disabledText: {
      color: "#ccc",
    },
    paginationInfo: {
      alignItems: "center",
      paddingBottom: 20,
      // marginBottom:150,
    },
    paginationInfoText: {
      color: theme === "dark" ? "#fff" : "#28292D",
    },
    noResultsText:{
      textAlign:'center',
      fontSize:18,
      color: theme === "dark" ? "#fff" : "#28292D",
      marginBottom:30,
    },
  });
}
