import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { IStackScreensNavigatorProps } from '../navigator/StackNavigator';
import { appStyles } from '../theme/appTheme';

interface IProps
  extends StackScreenProps<IStackScreensNavigatorProps, 'HomeScreen'> {}

const HomeScreen = ({ navigation: { navigate } }: IProps) => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();
  const onPress = (pokemon: SimplePokemon, color: string) =>
    navigate('PokemonScreen', { pokemon, color });
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appStyles.pokeBola}
      />
      <FlatList
        data={simplePokemonList}
        renderItem={({ item: pokemon }) => (
          <PokemonCard pokemon={pokemon} onPress={onPress} />
        )}
        numColumns={2}
        keyExtractor={({ id }) => id}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <ActivityIndicator
            style={styles.activityIndicator}
            size={20}
            color='grey'
          />
        }
        ListHeaderComponent={
          <Text
            style={[
              { marginTop: top + 20 },
              appStyles.title,
              appStyles.globalMargin,
            ]}
          >
            Pokedex
          </Text>
        }
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    height: 100,
  },
});
