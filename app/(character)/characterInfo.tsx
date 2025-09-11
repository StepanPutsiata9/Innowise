import { TouchableOpacity, Image, View, ScrollView,StyleSheet } from "react-native";
import { Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Back from '../../components/SVGComponents/Back';
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




 function useStyles() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return StyleSheet.create({
    containerChatcterInfo: {
      height: "100%",
      width: "100%",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },

    imageInfo: {
      height: 350,
      width: 350,
      borderRadius: 20,
      borderColor: theme === "dark" ? "#fff" : "#000",
      marginBottom: 15,
      borderWidth: 1,
    },

    nameOfSelectedCharacter: {
      fontSize: 34,
      color: theme === "dark" ? "#fff" : "#000",
      marginLeft: 20,
      fontWeight: 500,
    },

    titleBlock: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      alignItems: "center",
      flexDirection: "row",
      marginHorizontal: 10,
      marginBottom: 10,
    },

    photoBlock: {
      marginHorizontal: "auto",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },

    infoBlock: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      marginHorizontal: "auto",
    },

    backLine: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      flexDirection: "row",
      alignItems: "center",
    },

    infoLineSelectedCharacter: {
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      width: 350,
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "center",
      flexWrap: "wrap",
    },

    infoParams: {
      color: theme === "dark" ? "#fff" : "#8b8b8b",
      fontSize: 20,
      marginRight: 5,
      fontWeight: 500,
    },

    infoText: {
      color: theme === "dark" ? "#fff" : "#000",
      fontSize: 20,
      fontWeight: 700,
    },

    alive: {
      backgroundColor: "green",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },

    dead: {
      backgroundColor: "red",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },

    unknown: {
      backgroundColor: "grey",
      width: 15,
      height: 15,
      borderRadius: 25,
      marginLeft: 5,
    },
  });
}
