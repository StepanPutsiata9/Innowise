import React, { useState, memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { setSelectedCharacter } from "@/features/characters/store/charactersSlice";
import useStyles from "./useItemStyles";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "expo-router";
import { Character } from "@/features/characters/types/character.interfaces";

interface ICharacterType {
  character: Character;
}
const CharacterCard = ({ character }: ICharacterType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSelectedCharacter(character));
        router.push("/(character)/characterInfo");
      }}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: !imageError
              ? character.image
              : require("@/assets/images/logo2.png"),
          }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{character.name}</Text>
          <View style={styles.infoLine}>
            <Text style={styles.infoParams}>Status: </Text>
            <Text style={styles.infoText}>{character.status}</Text>
            <View
              style={
                (character.status == "Alive" && styles.alive) ||
                (character.status == "Dead" && styles.dead) ||
                (character.status == "unknown" && styles.unknown)
              }
            ></View>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.infoParams}>Species: </Text>
            <Text style={styles.infoText}>{character.species}</Text>
          </View>
          <Text style={styles.infoParams}>last known location: </Text>
          <Text style={styles.infoText}>
            {character?.location?.name || "unknown"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CharacterCard);
