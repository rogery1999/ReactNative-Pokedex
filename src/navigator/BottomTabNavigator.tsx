import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchStackNavigator from './SearchStackNavigator';
import StackNavigator from './StackNavigator';

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <TabsNavigator.Navigator
        initialRouteName='Tab1'
        sceneContainerStyle={{ backgroundColor: 'white' }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#5856D6',
          tabBarLabelStyle: {
            marginBottom: Platform.OS === 'android' ? 10 : 0,
          },
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            borderColor: 'transparent',
            backgroundColor: 'rgba(255,255,255, 0.92)',
            height: Platform.OS === 'ios' ? 80 : 60,
            shadowColor: 'transparent',
            borderTopWidth: 0,
          },
          tabBarBadgeStyle: {
            borderWidth: 10,
          },
        }}
      >
        <TabsNavigator.Screen
          name='Tab1'
          component={StackNavigator}
          options={{
            tabBarLabel: 'Listado',
            tabBarIcon: ({ color }) => (
              <Icon name='list-outline' size={25} color={color} />
            ),
          }}
        />
        <TabsNavigator.Screen
          name='Tab2'
          component={SearchStackNavigator}
          options={{
            tabBarLabel: 'Búsqueda',
            tabBarIcon: ({ color }) => (
              <Icon name='search-outline' size={25} color={color} />
            ),
          }}
        />
      </TabsNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
