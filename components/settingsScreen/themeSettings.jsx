import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Text } from 'react-native';

import Sun from "./Sun"
import Moon from "./Moon"
export default function ThemeSettingsScreen() {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.promo}>Theme mode :</Text>

            <View style={styles.imageView}>
                {theme == "light" ?
                    <Sun />
                    :
                    <Moon />
                }
            </View>
            <TouchableOpacity
                style={styles.changeThemeBtn}
                onPress={() => dispatch(toggleTheme())}
            >
                <Text>Change theme</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8b8b9b',
    },
    promo: {
        fontSize: 20,
        fontWeight: 700,
        color: "white",
        marginBottom: 20
    },
    imageView:{
        marginBottom:10
    },
    changeThemeBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#8b8b8b'
    }
});