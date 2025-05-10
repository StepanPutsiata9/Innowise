import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function useThemeStyles() {
    const theme = useSelector((state) => state.theme.mode);

    return StyleSheet.create({
        // for themeSettings.jsx
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#000' : '#fff',

        },
        text: {
            color: theme === 'dark' ? '#fff' : '#000',
            fontSize: 18,
        },
        changeThemeBtn: {
            backgroundColor: theme === 'dark' ? '#1F2023' : '#fff',
            paddingHorizontal: 50,
            paddingVertical: 10,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme === 'dark' ? '#fff' : '#121212',
        },
        // for header.jsx
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 5,
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

        // for Character.jsx
        containerCharacters: {
            flex: 1,
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            paddingTop:10,
        },
        listContent: {
            padding: 5,
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        prevNext: {
            color: theme === 'dark' ? '#fff' : '#28292D',
        },
        error: {
            color: 'red',
            marginBottom: 20,
        },
        loader: {
            marginTop: 20,
        },
        retryButton: {
            padding: 10,
            backgroundColor: '#ddd',
            borderRadius: 5,
        },
        paginationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 'auto',
            marginVertical: 10,
        },
        pageButton: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            marginHorizontal: 2,
            borderRadius: 4,
            backgroundColor: theme === 'dark' ? '#8b8b8b':'#eee',
        },
        activePageButton: {
            backgroundColor: '#007bff',
        },
        activePageText: {
            color: '#fff',
        },
        navButton: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginHorizontal: 5,
        },
        disabledText: {
            color: '#ccc',
        },
        paginationInfo: {
            alignItems: 'center',
            paddingBottom: 20,
            // marginBottom:150,
        },
        paginationInfoText: {
            color: theme === 'dark' ? '#fff' : '#28292D',
        },


        // for Item.jsx
        card: {
            flexDirection: 'row',
            backgroundColor: theme === 'dark' ? '#28292D':'#fff'  ,
            borderRadius: 16,
            marginBottom: 10,
            overflow: 'hidden',
            elevation: 2,
            width: "95%",
            marginHorizontal: 'auto',
            marginBottom: 20,
            borderWidth:2,
            borderColor:theme === 'dark' ? '#fff':'#28292D' 
        },
        image: {
            width: 175,
            minHeight:175
        },
        info: {
            padding: 10,
            flex: 1,
            marginLeft: 10

        },
        infoLine:{
            flexDirection:'row',
            marginBottom:3,
            alignItems:'center',
            flexWrap:'wrap',

        },
        name: {
            fontWeight: 'bold',
            color:theme === 'dark' ? '#fff' : '#28292D',
            fontSize: 20,
            marginBottom: 10,
        },
        infoParams:{
            color:theme === 'dark' ? '#8b8b8b':'#28292D',
            fontWeight:500,
            fontSize:16,
            marginRight:3,
        },
        infoText:{
            color:theme === 'dark' ? '#fff':'#000',
            fontWeight:700,
            fontSize:16,
        },
        dead:{
            width:13,
            height:13,
            backgroundColor:'red',
            marginLeft:5,
            borderRadius:25,
        },
         alive:{
            width:13,
            height:13,
            backgroundColor:'green',
            marginLeft:5,
            borderRadius:25,
        },
        unknown:{
            width:13,
            height:13,
            backgroundColor:'grey',
            marginLeft:5,
            borderRadius:25,
        },

    });
}