import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Navegação
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Páginas
import Login from './pages/login'
import Turma from './pages/turma'
import Ranking from './pages/ranking'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Navegação pelo menu lateral
const Autenticado = () => {
  return(
    <Drawer.Navigator initialRouteName="Ranking">
      <Drawer.Screen name="Ranking" component={Ranking} />
      <Drawer.Screen name="Turma" component={Turma} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
