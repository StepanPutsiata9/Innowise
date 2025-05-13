import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function useStyles() {
    const theme = useSelector((state) => state.theme.mode);

    return StyleSheet.create({
        // for selectedCharacter
        containerChatcterInfo: {
            height: "100%",
            width: '100%',

            // paddingHorizontal:20,
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
        },
        imageInfo: {
            height: 300,
            width: 300,
            borderRadius: 20,
            borderColor: theme === 'dark' ? '#fff' : '#000',
            marginBottom: 15,
            borderWidth: 1,
        },
        nameOfSelectedCharacter: {
            fontSize: 28,
            marginVertical: 12,
            color: theme === 'dark' ? '#fff' : '#000',
            marginLeft: 20

        },
        titleBlock: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            alignItems: 'center',
            flexDirection: 'row',
            // justifyContent:"flex-start",
            marginLeft: 20
        },
        photoBlock: {
            marginHorizontal: 'auto',
            backgroundColor: theme === 'dark' ? '#000' : '#fff'
        },
        infoBlock: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            marginHorizontal: 'auto',

        },
        backLine: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            flexDirection: 'row',
            alignItems: 'center',
        },
        infoLineSelectedCharacter: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            width: 300,
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
        },

  });
};
