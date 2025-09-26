import Header from "../../features/shared/components/Header/Header";
import Characters from "@/features/characters/components/CharactersList/Characters";
import Search from "@/features/characters/components/Search/Search";
import Filter from "@/features/characters/components/CharacterFilter/CharacterFilter";
import { useSelector } from "react-redux";
import BackToRetry from "@/features/shared/components/BackToRetryPage/BackToRetryPage";
import { RootState } from "@/store/store";
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
