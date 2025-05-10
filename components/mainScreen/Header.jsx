import { StyleSheet } from 'react-native';
import { View,Text,Image } from 'react-native';
export default function Header(){
    return(
        <View style={styles.header}>
             <Image 
                    source={require("../../assets/images/logo.png")} 
                    style={styles.image} 
                  />
            <Text style={styles.headerText}>The Rick and Morty App</Text>
        </View>
    );
}



const styles = StyleSheet.create({
 header:{
    flexDirection:'row',
    justifyContent:'center',
    paddingVertical:5,
    alignItems:'center',
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:'8b8b8b'
 },
 headerText:{
    fontSize:20,
    fontWeight:700,
    marginLeft:10
    // textAlign:'center',

 }
});
