import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function useStyles() {
    const theme = useSelector((state) => state.theme.mode);

    return StyleSheet.create({
 
        // for header.jsx
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 35,
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            borderBottomWidth: 2,
            borderBottomColor: theme === 'dark' ? '#fff' : '#121212',
        },
        headerText: {
            fontSize: 20,
            fontWeight: 700,
            marginLeft: 10,
            color: theme === 'dark' ? '#fff' : '#28292D',
        },
        logo: {
            width: 50,
            height: 50,
        },

    
})
};
