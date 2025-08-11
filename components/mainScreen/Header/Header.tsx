import { StyleSheet } from 'react-native';
import { View,Text,Image } from 'react-native';
import useStyles from './useHeaderStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Header(){
        const styles=useStyles();
        const insets = useSafeAreaInsets();
    return(
        <View style={[styles.header,{paddingTop:insets.top}]}>
             <Image 
                    source={require("../../../assets/images/logo2.png")}
                    style={styles.logo} 
                  />
            <Text style={styles.headerText}>The Rick and Morty App</Text>
        </View>
    );
}




