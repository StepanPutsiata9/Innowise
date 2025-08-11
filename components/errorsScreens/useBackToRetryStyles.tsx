import { RootState } from '@/store';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function useStyles() {
    const theme = useSelector((state:RootState) => state.theme.mode);

    return StyleSheet.create({
        offlineBlockText: {
            fontSize: 18,
            color: theme === 'dark' ? '#fff' : '#000',
            textAlign: 'center',

        },
        offlineBlock: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            paddingVertical: 20,
        }
    });
};
