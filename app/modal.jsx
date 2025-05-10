import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
export default function ModalScreen() {
  const router = useRouter();
  const char = {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" },
    "location": { "name": "Citadel of Ricks", "url": "https://rickandmortyapi.com/api/location/3" },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  }
  const character = useSelector((state) => state.characters.selectedCharacter);
  return (
    <View style={styles.containerChatcterInfo}>


        <View style={styles.info}>
          <Text style={styles.name}>{character.name || "Unknown"}</Text>

          <Image
            source={{ uri: character.image }}
            style={styles.image}
          />
          <Text>Status: {character.status || "Unknown"}</Text>
          <Text>Species: {character.species || "Unknown"}</Text>
          <Text>Gender: {character.gender || "Unknown"}</Text>
          <View>
            <Text>Origin: {character.origin.name || "Unknown"}</Text>
          </View>
          <Text>Location: {character.location.name || "Unknown"}</Text>
        </View>

      <TouchableOpacity onPress={() => {
        router.back();
      }}>
        <Text>CLick</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerChatcterInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius:10
  },
  info: {
    padding: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    marginVertical: 15,
    textAlign:'center',

  }

});
