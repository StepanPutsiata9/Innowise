import { StyleSheet } from 'react-native';
import ThemeSettingsScreen from "../../components/settingsScreen/themeSettings"
import Header from "../../components/mainScreen/Header/Header"
export default function TabTwoScreen() {
  return (
    <>
    <Header/>
    <ThemeSettingsScreen/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
