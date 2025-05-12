import { View, TextInput } from "react-native";
import useThemeStyle from "../../hooks/useThemeStyles";
import { searchCharacter } from "../../store/slices/charactersSlice";
import { useDispatch } from "react-redux";
export default function Search() {
    const dispatch = useDispatch();
    const styles = useThemeStyle();
    const handleTextChange = (inputText) => {
        dispatch(searchCharacter(inputText));
    };
    return (
        <View style={styles.searchView}>
            <TextInput
                style={styles.input}
                placeholder="Search character in this page by name"
                placeholderTextColor="#999"
                onChangeText={handleTextChange}
            />
        </View>
    );
}