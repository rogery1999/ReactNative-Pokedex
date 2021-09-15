import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';

export type IStackSearchScreensNavigatorProps = {
  SearchScreen: undefined;
  PokemonScreen: { pokemon: SimplePokemon; color: string };
};

const Stack = createStackNavigator<IStackSearchScreensNavigatorProps>();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='SearchScreen'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='PokemonScreen' component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
