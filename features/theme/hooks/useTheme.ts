import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "@/store/store";
import { IThemeColors } from "../types/theme.interfaces";
import { lightColors, darkColors } from "../constants/theme";

export const useTheme = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const colors: IThemeColors = useMemo(() => {
    return themeMode === "light" ? lightColors : darkColors;
  }, [themeMode]);

  const isDark = themeMode === "dark";
  const isLight = themeMode === "light";

  return {
    mode: themeMode,
    colors,
    isDark,
    isLight,
    currentTheme: themeMode,
    theme: colors,
  };
};
