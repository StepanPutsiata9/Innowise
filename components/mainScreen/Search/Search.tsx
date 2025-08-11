import { View, TextInput } from "react-native";
import useStyles from "./useSearchStyles"
import { searchCharacter, } from "../../../store/slices/charactersSlice";
import {useAppDispatch} from "@/store/index"
export default function Search() {
    const dispatch = useAppDispatch();
    const styles = useStyles();
    const handleTextChange = (inputText:string) => {
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