import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Home from '../screen/Home';
import Fuel from '../screen/Fuel';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} options={{ headerBackTitle: '', headerBackVisible: false }} />
        <Stack.Screen name="Fuel" component={Fuel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}