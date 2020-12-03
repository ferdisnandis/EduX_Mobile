import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import { Screen, screensEnabled } from 'react-native-screens';

//Navegação
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Páginas
import Login from './pages/login'
import Turma from './pages/turma'
import Ranking from './pages/ranking'
import Postagens from './pages/postagens'
import Objetivos from './pages/objetivo'
import Alunos from './pages/alunos'

//Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Icones do menu
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Ionicons from 'react-native-vector-icons/Ionicons';

//Criar navegação
//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
//
//Navegação pelo menu tab
//    
const Autenticado = () => {
  return(
<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ranking') {
              iconName = focused
                ? 'ios-podium'
                : 'ios-podium';

            } else if (route.name === 'Objetivos') {
              iconName = focused 
              ? 'ios-book' : 'ios-book'

            } else if (route.name === 'Alunos') {
              iconName = focused 
              ? 'ios-school' : 'ios-school'

            } else if (route.name === 'Turma') {
              iconName = focused 
              ? 'ios-people' : 'ios-people'

            } else if (route.name === 'Feed') {
              iconName = focused 
              ? 'ios-information-circle' : 'ios-information-circle-outline'

            } else if (route.name === 'Logout') {
              iconName = focused 
              ? 'ios-log-out' : 'ios-log-out'
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'black',
          showIcon: true,
        }}
      >
        <Tab.Screen name="Ranking" component={Ranking} />
        <Tab.Screen name="Objetivos" component={Objetivos} />
        <Tab.Screen name="Alunos" component={Alunos} />
        <Tab.Screen name="Turma" component={Turma} />
        <Tab.Screen name="Feed" component={Postagens}/>
        <Tab.Screen name="Logout" component={Logout} />
</Tab.Navigator>
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
