import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';


import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import useThemeStyles from '@/hooks/useThemeStyles';
import Header from '@/components/mainScreen/Header';
import Back from "../components/mainScreen/Back"
export default function ModalScreen() {
  const router = useRouter();
  const styles = useThemeStyles();
  const theme = useSelector((state) => state.theme.mode)
  const character = useSelector((state) => state.characters.selectedCharacter);
  return (


    <View style={styles.containerChatcterInfo}>
      <View style={styles.titleBlock} >
        <TouchableOpacity onPress={() => router.back()}>
          <Back color={theme == "dark" ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={styles.nameOfSelectedCharacter}>{character.name || "Unknown"}</Text>
      </View>


      <View style={styles.photoBlock}>
        <Image
          source={{ uri: character.image }}
          style={styles.imageInfo}
        />
      </View>
    <View style={styles.infoBlock}>
      <View style={styles.infoLineSelectedCharacter}>
        <Text style={styles.infoParams}>Status: </Text>
        <Text style={styles.infoText}>{character.status}</Text>
        <View style={(character.status == "Alive" && styles.alive) ||
          (character.status == "Dead" && styles.dead) ||
          (character.status == "unknown" && styles.unknown)
        }></View>
      </View>
      <View style={styles.infoLineSelectedCharacter}>
        <Text style={styles.infoParams}>Species: </Text>
        <Text style={styles.infoText}>{character.species}</Text>
      </View>
      <View style={styles.infoLineSelectedCharacter}>
        <Text style={styles.infoParams}>last known location: </Text>
        <Text style={styles.infoText}>{character.location.name}</Text>
      </View>

      <View style={styles.infoLineSelectedCharacter}>
        <Text style={styles.infoParams}>Gender: </Text>
        <Text style={styles.infoText}>{character.gender}</Text>
      </View>
      <View style={styles.infoLineSelectedCharacter}>
        <Text style={styles.infoParams}>Origin: </Text>
        <Text style={styles.infoText}>{character.origin.name}</Text>
      </View>
    </View>

    </View>




  );
}

