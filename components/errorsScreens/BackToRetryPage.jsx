import { View, TouchableOpacity ,Text} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './useBackToRetryStyles';
import { setOfflineMode } from "../../store/slices/charactersSlice"
export default function BackToRetry() {
    //   const { isOfflineMode } = useSelector((state) => state.characters);
    const dispatch = useDispatch();
    const styles = useStyles();
    return (
        <TouchableOpacity style={styles.offlineBlock} onPress={() => { dispatch(setOfflineMode(false)) }}>
            <Text style={styles.offlineBlockText}>Offline Mode. Back to Retry</Text>
        </TouchableOpacity>
    );
}

