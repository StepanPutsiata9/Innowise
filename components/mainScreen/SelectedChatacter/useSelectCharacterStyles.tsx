import { RootState } from "@/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
export default function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    containerChatcterInfo: {
      height: "100%",
      width: "100%",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    imageInfo: {
      height: 350,
      width: 350,
      borderRadius: 20,
      borderColor: theme === "dark" ? "#fff" : "#000",
      marginBottom: 15,
      borderWidth: 1,
    },
    nameOfSelectedCharacter: {
      fontSize: 34,
      color: theme === "dark" ? "#fff" : "#000",
      marginLeft: 20,
      fontWeight: 500,
    },
    titleBlock: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      alignItems: "center",
      flexDirection: "row",
      marginLeft: 25,
      marginBottom: 10,
    },
    photoBlock: {
      marginHorizontal: "auto",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    infoBlock: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      marginHorizontal: "auto",
    },
    backLine: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      flexDirection: "row",
      alignItems: "center",
    },
    infoLineSelectedCharacter: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      width: 350,
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "center",
      flexWrap: "wrap",
    },
    infoParams: {
      color: theme === "dark" ? "#fff" : "#8b8b8b",
      fontSize: 20,
      marginRight: 5,
      fontWeight: 500,
    },
    infoText: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 20,
      fontWeight: 700,
    },
    alive: {
      backgroundColor: "green",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },
    dead: {
      backgroundColor: "red",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },
    unknown: {
      backgroundColor: "grey",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },
  });
}
