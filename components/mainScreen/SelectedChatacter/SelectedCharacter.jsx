import { TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';

import { Text } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import useStyles from './useSelectCharacterStyles';
import axios from 'axios';
import Back from "../../../components/mainScreen/Back"

export default function SelectedCharacter() {
  const { isOfflineMode } = useSelector((state) => state.characters);
  const router = useRouter();
  const styles = useStyles();
  const theme = useSelector((state) => state.theme.mode)
  const character = useSelector((state) => state.characters.selectedCharacter);
  const [episodeName, setEpisodeName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(character.episode[0]);
        setEpisodeName(characterResponse.data.name);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    !isOfflineMode && fetchData();
  }, [character.id]);
  if (!isOfflineMode && loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
        {!isOfflineMode&&
          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>First seen in: </Text>
            <Text style={styles.infoText}>{episodeName}</Text>
          </View>
        }
      </View>
    </View>
  );
}

