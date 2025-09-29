import {
  CharacterFilter as Filter,
  CharacterSearch as Search,
  CharactersList as Characters,
} from "@/features/characters";
import { BackToRetry, Header } from "@/features/shared";
import { useSelector } from "react-redux";
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
