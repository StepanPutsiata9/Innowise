import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
} from "react-native";

import { Text } from "react-native";

import React from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import useStyles from "./useSelectCharacterStyles";
import Back from "../Back";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "@/store";
export default function SelectedCharacter() {
  const router = useRouter();
  const styles = useStyles();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const character = useSelector(
    (state: RootState) => state.characters.selectedCharacter
  );
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.containerChatcterInfo, { paddingTop: insets.top }]}>
      <View style={styles.titleBlock}>
        <TouchableOpacity onPress={() => router.back()}>
          <Back color={theme == "dark" ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={styles.nameOfSelectedCharacter}>
          {character?.name || "Unknown"}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.photoBlock}>
          {character?.image ? (
            <Image
              source={{ uri: character?.image }}
              style={styles.imageInfo}
            />
          ) : (
            <Text>Photo not found</Text>
          )}
        </View>

        <View style={styles.infoBlock}>
          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>Status: </Text>
            <Text style={styles.infoText}>{character!.status}</Text>
            <View
              style={
                (character!.status == "Alive" && styles.alive) ||
                (character!.status == "Dead" && styles.dead) ||
                (character!.status == "unknown" && styles.unknown)
              }
            ></View>
          </View>
          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>Species: </Text>
            <Text style={styles.infoText}>
              {character?.species || "unknowh"}
            </Text>
          </View>
          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>last known location: </Text>
            <Text style={styles.infoText}>
              {character?.location?.name || "unknowh"}
            </Text>
          </View>

          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>Gender: </Text>
            <Text style={styles.infoText}>
              {character?.gender || "unknowh"}
            </Text>
          </View>

          <View style={styles.infoLineSelectedCharacter}>
            <Text style={styles.infoParams}>Origin: </Text>
            <Text style={styles.infoText}>
              {character?.origin?.name || "unknowh"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
