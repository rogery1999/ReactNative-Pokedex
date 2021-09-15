/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface IProps {
  pokemonFull: PokemonFull;
}

const { height } = Dimensions.get('window');

const PokemonDetails = ({ pokemonFull }: IProps) => {
  return (
    <ScrollView
      style={{ ...StyleSheet.absoluteFillObject }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.contentContainer, { marginTop: height / 2 - 10 }]}>
        <View style={styles.marginPage}>
          <Text style={styles.title}>Types</Text>
          <View style={styles.typesContainer}>
            {pokemonFull.types.map(({ type }) => (
              <Text
                style={[styles.regularText, { marginRight: 12 }]}
                key={type.name}
              >
                {type.name}
              </Text>
            ))}
          </View>
          <Text style={[styles.title, { marginTop: 20 }]}>Peso</Text>
          <Text style={styles.regularText}>{pokemonFull.weight} kg</Text>
        </View>
        <View style={styles.spritesContainer}>
          <Text style={[styles.title, styles.marginPage]}>Sprites</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <FadeInImage
            uri={pokemonFull.sprites.front_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemonFull.sprites.back_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemonFull.sprites.front_shiny}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemonFull.sprites.back_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>
        <View style={styles.marginPage}>
          <Text style={[styles.title]}>Habilidades base</Text>
          <View style={[styles.typesContainer]}>
            {pokemonFull.abilities.map(({ ability }) => (
              <Text
                style={[styles.regularText, { marginRight: 12 }]}
                key={ability.name}
              >
                {ability.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={[styles.marginPage, { marginTop: 20 }]}>
          <Text style={[styles.title]}>Movimientos</Text>
          <View
            style={[
              styles.typesContainer,
              { flexWrap: 'wrap', flexDirection: 'row' },
            ]}
          >
            {pokemonFull.moves.map(({ move }) => (
              <Text
                style={[styles.regularText, { marginRight: 12 }]}
                key={move.name}
              >
                {move.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={[styles.marginPage, { marginTop: 20 }]}>
          <Text style={[styles.title]}>Stats</Text>
          <View>
            {pokemonFull.stats.map(({ stat, base_stat }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={stat.name}
              >
                <Text
                  style={[
                    styles.regularText,
                    {
                      marginRight: 12,
                      fontWeight: 'bold',
                      width: 150,
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  {stat.name}
                  {': '}
                </Text>
                <Text style={[{ marginRight: 12 }]}>{base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={[
            styles.marginPage,
            {
              marginBottom: 22,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <FadeInImage
            uri={pokemonFull.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 17,
  },
  typesContainer: {
    flexDirection: 'row',
  },
  spritesContainer: {
    marginTop: 20,
  },
  marginPage: {
    marginHorizontal: 20,
  },
  basicSprite: {
    height: 100,
    width: 100,
    marginRight: 15,
  },
});
