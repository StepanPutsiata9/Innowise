import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterCard = ({ character }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: character.image }} 
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text>Status: {character.status}</Text>
        <Text>Species: {character.species}</Text>
        <Text>Location: {character.location.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    width:"95%",
    marginHorizontal:'auto',
    marginBottom:20,
  },
  image: {
    width: 175,
    height: 175,
  },
  info: {
    padding: 10,
    flex: 1,
    marginLeft:10
    
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  }
});

export default CharacterCard;