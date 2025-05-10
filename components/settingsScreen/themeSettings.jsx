import { View, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Text } from 'react-native';

export default function ThemeSettingsScreen() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
    <Text>Settings</Text>
      <Button
        title={`Текущая тема: ${theme}`}
        onPress={() => dispatch(toggleTheme())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});