import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type IStackScreensNavigatorProps = {
  HomeScreen: undefined;
  PokemonScreen: { pokemon: SimplePokemon; color: string };
};

const Stack = createStackNavigator<IStackScreensNavigatorProps>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='PokemonScreen' component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
