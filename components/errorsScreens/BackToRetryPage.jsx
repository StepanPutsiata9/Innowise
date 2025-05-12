import { View, TouchableOpacity ,Text} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import useThemeStyles from '@/hooks/useThemeStyles';
import { setOfflineMode } from "../../store/slices/charactersSlice"
export default function BackToRetry() {
    //   const { isOfflineMode } = useSelector((state) => state.characters);
    const dispatch = useDispatch();
    const styles = useThemeStyles();
    return (
        <TouchableOpacity style={styles.offlineBlock} onPress={() => { dispatch(setOfflineMode(false)) }}>
            <Text style={styles.offlineBlockText}>Back to retry page</Text>
        </TouchableOpacity>
    );
}

