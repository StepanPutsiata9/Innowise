import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme,setTheme } from '../../store/slices/themeSlice';
import { Text } from 'react-native';
import useStyles from "./useSettingsStyles"
import Sun from "./Sun"
import Moon from "./Moon"
export default function ThemeSettingsScreen() {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const styles=useStyles();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Theme mode :</Text>

            <View style={{ marginBottom:10}}>
                {theme == "light" ?
                    <Sun />
                    :
                    <Moon />
                }
            </View>
            <TouchableOpacity
                style={styles.changeThemeBtn}
                onPress={() => {
                    dispatch(toggleTheme());

                }
                }
            >
                <Text style={styles.text}>Change theme</Text>
            </TouchableOpacity>

        </View>
    );
}

