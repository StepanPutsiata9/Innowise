import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function useStyles() {
    const theme = useSelector((state) => state.theme.mode);

    return StyleSheet.create({
        // for themeSettings.jsx
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#000' : '#fff',

        },
        text: {
            color: theme === 'dark' ? '#fff' : '#000',
            fontSize: 18,
        },
        changeThemeBtn: {
            backgroundColor: theme === 'dark' ? '#1F2023' : '#fff',
            paddingHorizontal: 50,
            paddingVertical: 10,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme === 'dark' ? '#fff' : '#121212',
        },
  });
};
