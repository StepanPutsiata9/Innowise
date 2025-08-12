import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useSelector } from "react-redux";
import { toggleTheme, setTheme } from "../../store/slices/themeSlice";
import { Text } from "react-native";
import useStyles from "./useSettingsStyles";
import { RootState, useAppDispatch } from "@/store/index";
import Sun from "./Sun";
import Moon from "./Moon";
import { useState } from "react";
export default function ThemeSettingsScreen() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(
    theme === "light" ? true : false
  );
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme mode :</Text>

      <View style={{ marginBottom: 10 }}>
        {theme == "light" ? <Sun /> : <Moon />}
      </View>

      <Switch
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          dispatch(toggleTheme());
          setIsEnabled((prev) => !prev);
        }}
      />
    </View>
  );
}
