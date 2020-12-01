import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import { Screen, screensEnabled } from 'react-native-screens';

//Navegação
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Páginas
import Login from './pages/login'
import Turma from './pages/turma'
import Ranking from './pages/ranking'
import Postagens from './pages/postagens'
import Objetivos from './pages/objetivo'

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Logout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Deseja realmente sair da aplicação?</Text>
      <Button title="Sair" onPress={() => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }} />
    </View>
  )
}

// />
//<Drawer.Screen name= "Postagens" components={Postagens} />
//Navegação pelo menu lateral
const Autenticado = () => {
  return(
    <Drawer.Navigator screenOptions={{headerShown : true }} initialRouteName="Ranking">
      <Drawer.Screen name="Ranking" component={Ranking} />
      <Drawer.Screen name="Turma" component={Turma} />
    
      <Drawer.Screen name="Objetivos" component={Objetivos} />
      <Drawer.Screen name="Logout" component={Logout} />
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
