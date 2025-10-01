import { IThemeColors } from "../types/theme.interfaces";

export const lightColors: IThemeColors = {
  backgroundColor: "#fff",
  textColor: "#000",
  cardBackgroundColor: "#fff",
  borderColor: "#000",
  filterBackgroundColor: "#f0f0f0",
  prevTextColor: "#8b8b8b",
  tabActiveColor: "#000",
  tabInactiveColor: "#888",
  searchBackgroundColor: "#fff",
  selectedFilter: "#e3f2fd",
};

export const darkColors: IThemeColors = {
  backgroundColor: "#000",
  textColor: "#fff",
  cardBackgroundColor: "#28292D",
  borderColor: "#fff",
  filterBackgroundColor: "#28292D",
  prevTextColor: "#28292D",
  tabActiveColor: "#fff",
  tabInactiveColor: "#666",
  searchBackgroundColor: "#28292D",
  selectedFilter: "#28292D",
};

export const allColors = {
  light: lightColors,
  dark: darkColors,
};
