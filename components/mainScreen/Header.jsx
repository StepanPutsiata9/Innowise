import { StyleSheet } from 'react-native';
import { View,Text,Image } from 'react-native';
import useThemeStyles from '@/hooks/useThemeStyles';
export default function Header(){
        const styles=useThemeStyles();
    
    return(
        <View style={styles.header}>
             <Image 
                    source={require("../../assets/images/logo2.png")} 
                    style={styles.logo} 
                  />
            <Text style={styles.headerText}>The Rick and Morty App</Text>
        </View>
    );
}




