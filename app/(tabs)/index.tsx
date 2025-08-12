import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/mainScreen/Header/Header";
import Characters from "../../components/mainScreen/Characters/Characters";
import Search from "../../components/mainScreen/Search/Search";
import Filter from "../../components/mainScreen/Filter/Filter";
import { useSelector } from "react-redux";
import BackToRetry from "../../components/errorsScreens/BackToRetryPage";
import { RootState } from "@/store";
import { StatusBar } from "expo-status-bar";
export default function TabOneScreen() {
  const { isOfflineMode } = useSelector((state: RootState) => state.characters);
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <Header />
      {!isOfflineMode ? (
        <>
          <Search />
          <Filter />
        </>
      ) : (
        <BackToRetry />
      )}
      <Characters />
    </>
  );
}
