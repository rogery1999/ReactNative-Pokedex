/* eslint-disable react-hooks/exhaustive-deps */
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { IStackScreensNavigatorProps } from '../navigator/StackNavigator';
import { appStyles } from '../theme/appTheme';

const { width } = Dimensions.get('window');

interface IProps
  extends StackScreenProps<IStackScreensNavigatorProps, 'HomeScreen'> {}

const SearchScreen = ({ navigation: { navigate } }: IProps) => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const [pokemonsFiltered, setPokemonsFiltered] = useState<SimplePokemon[]>([]);
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const filtrarPokemonesByName = (termino: string) => {
    if (term.length > 0) {
      setPokemonsFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(termino.toLowerCase())
        )
      );
    } else {
      setPokemonsFiltered([]);
    }
  };
  const filtrarPokemonesById = (id: string) => {
    const pokemon = simplePokemonList.find(
      simplePokemon => simplePokemon.id === id
    );
    setPokemonsFiltered(pokemon ? [pokemon] : []);
  };
  const onPress = (pokemon: SimplePokemon, color: string) =>
    navigate('PokemonScreen', { pokemon, color });
  useEffect(() => {
    if (isNaN(Number(term))) {
      filtrarPokemonesByName(term);
    } else {
      filtrarPokemonesById(term);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }
  return (
    <View style={[styles.page, {}]}>
      <SearchInput
        style={{
          ...styles.searchInputContainer,
          width: width - 40,
          marginTop: top + 15,
        }}
        onDebunced={(value: string) => setTerm(value)}
      />
      <FlatList
        data={pokemonsFiltered}
        renderItem={({ item: pokemon }) => (
          <PokemonCard pokemon={pokemon} onPress={onPress} />
        )}
        numColumns={2}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={
          <Text
            style={[
              { marginTop: top + 70 },
              appStyles.title,
              appStyles.globalMargin,
            ]}
          >
            {term}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        onScroll={Keyboard.dismiss}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  activityIndicator: {
    height: 100,
  },
  searchInputContainer: {
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 999,
    top: 0,
  },
});
