import {
  CharacterFilter as Filter,
  CharacterSearch as Search,
  CharactersList as Characters,
} from '@/features/characters';
import { BackToRetry, Header } from '@/features/shared';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/features/theme';
export default function HomeScreen() {
  const { isOfflineMode } = useSelector((state: RootState) => state.characters);
  const { mode, colors } = useTheme();
  return (
    <>
      <StatusBar style={mode === 'light' ? 'dark' : 'light'} />
      <Header themeColors={colors} />
      {!isOfflineMode ? (
        <>
          <Search themeColors={colors} />
          <Filter themeColors={colors} />
        </>
      ) : (
        <BackToRetry themeColors={colors} />
      )}
      <Characters themeColors={colors} />
    </>
  );
}
