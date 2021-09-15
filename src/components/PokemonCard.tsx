/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface IProps {
  pokemon: SimplePokemon;
  onPress: (pokemon: SimplePokemon, color: string) => void;
}

const { width } = Dimensions.get('window');

const PokemonCard = ({ pokemon, onPress }: IProps) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const getColors = async () => {
    const colors = await ImageColors.getColors(pokemon.picture);
    if (isMounted) {
      setBgColor(
        colors.platform === 'ios'
          ? colors.background
          : colors.dominant ?? 'grey'
      );
    } else {
      return;
    }
  };
  useEffect(() => {
    getColors();
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <TouchableOpacity
      style={styles.touchable}
      activeOpacity={0.7}
      onPress={() => onPress(pokemon, bgColor)}
    >
      <View
        style={[
          styles.cardContainer,
          { width: (width - 80) / 2, backgroundColor: bgColor },
        ]}
      >
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n'}
            {`#${pokemon.id}`}
          </Text>
        </View>
        <View style={[styles.pokebolaContainer, styles.pokebolaBackground]}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={[styles.pokebola, styles.pokebolaBackground]}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    height: 120,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  cardContainer: {
    backgroundColor: 'grey',
    height: 120,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  pokebola: {
    bottom: -20,
    right: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -10,
    bottom: -7,
  },
  pokebolaBackground: {
    height: 100,
    width: 100,
    position: 'absolute',
  },
  pokebolaContainer: {
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    borderBottomRightRadius: 10,
  },
});
