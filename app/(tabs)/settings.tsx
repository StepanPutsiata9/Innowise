import { StyleSheet, Switch, View, Text } from "react-native";
import { Header, Sun, Moon } from "@/features/shared";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { toggleTheme } from "@/features/theme/store/themeSlice";
import { useState } from "react";
export default function SettingsScreen() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(
    theme === "light" ? true : false,
  );
  const styles = useStyles();
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.text}>Theme mode :</Text>

        <View style={styles.logoView}>
          {theme == "light" ? <Sun /> : <Moon />}
        </View>

        <Switch
          value={isEnabled}
          style={{ transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }] }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            dispatch(toggleTheme());
            setIsEnabled((prev) => !prev);
          }}
        />
      </View>
    </>
  );
}

function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },

    text: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 18,
    },
    changeThemeBtn: {
      backgroundColor: theme === "dark" ? "#1F2023" : "#fff",
      paddingHorizontal: 50,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme === "dark" ? "#fff" : "#121212",
    },
    logoView: {
      marginBottom: 20,
    },
  });
}
