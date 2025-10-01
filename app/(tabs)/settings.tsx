import { Header } from '@/features/shared';
import { ToggleTheme, useTheme } from '@/features/theme';

export default function SettingsScreen() {
  const { colors, mode } = useTheme();
  return (
    <>
      <Header themeColors={colors} />
      <ToggleTheme themeColors={colors} mode={mode} />
    </>
  );
}
