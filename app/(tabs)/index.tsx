import Header from "../../components/Header/Header";
import Characters from "../../components/Characters/Characters";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import { useSelector } from "react-redux";
import BackToRetry from "../../components/BackToRetryPage/BackToRetryPage";
import { RootState } from "@/store";
import { StatusBar } from "expo-status-bar";
export default function HomeScreen() {
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
