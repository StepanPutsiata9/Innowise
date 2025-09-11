import { RootState } from "@/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    filterButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: theme === "dark" ? "#28292D" : "#f0f0f0",
      minWidth: 100,
      alignItems: "center",
    },
    filterButtonText: {
      fontSize: 14,
      color: theme === "dark" ? "#fff" : "#333",
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    filterOption: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#fff" : "#eee",
    },
    selectedFilterOption: {
      backgroundColor: theme === "dark" ? "#28292D" : "#e3f2fd",
    },
    filterOptionText: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },
    filterButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    applyButton: {
      backgroundColor: "#2196f3",
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
    resetButton: {
      backgroundColor: "#f44336",
      padding: 10,
      borderRadius: 5,
      flex: 1,
    },
  });
}
