import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import PokemonDetails from '../components/PokemonDetails';
import usePokemon from '../hooks/usePokemon';
import { IStackScreensNavigatorProps } from '../navigator/StackNavigator';

interface IProps
  extends StackScreenProps<IStackScreensNavigatorProps, 'PokemonScreen'> {}

const PokemonScreen = ({
  route: { params },
  navigation: { goBack },
}: IProps) => {
  const {
    pokemon: { name, id, picture },
    color,
  } = params;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon: pokemonFull } = usePokemon(id);
  return (
    <View style={styles.page}>
      <View
        style={[
          {
            backgroundColor: color,
          },
          styles.headerContainer,
        ]}
      >
        <TouchableOpacity
          style={[{ top: top + 5 }, styles.backButton]}
          activeOpacity={0.8}
          onPress={goBack}
        >
          <Icon name='arrow-back-outline' size={35} color='white' />
        </TouchableOpacity>

        <Text style={[styles.pokemonName, { top: top + 40 }]}>
          {name}
          {'\n'}
          {`#${id}`}
        </Text>
        <View>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemonFull={pokemonFull} />
      )}
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  headerContainer: {
    zIndex: 999,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    height: '45%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    padding: 2,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    left: 20,
  },
  pokebola: {
    height: 250,
    width: 250,
    top: 20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 280,
    height: 280,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
