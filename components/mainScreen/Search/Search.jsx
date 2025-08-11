import { View, TextInput } from "react-native";
import useStyles from "./useSearchStyles"
import { searchCharacter, } from "../../../store/slices/charactersSlice";
import { useDispatch } from "react-redux";
export default function Search() {
    const dispatch = useDispatch();
    const styles = useStyles();
    const handleTextChange = (inputText) => {
        //  dispatch(clearCharacters()); // Сначала очищаем
        //     dispatch(resetFilters()); // Затем сбрасываем фильтры
        //     dispatch(fetchCharacters()); // И загружаем данные
        //     setSelectedFilters({ status: '', species: '' });
        //     setVisibleFilter(null);
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