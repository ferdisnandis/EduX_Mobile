import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { url } from '../../utils/constants'
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarToken = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
    }

    const Logar = () => {
        const corpo = {
            Email : email,
            Senha : senha
        }

        fetch(url + 'login', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
          //  console.log(data)
            if(data.status != 401){
                alert('Seja bem vind@!');
          //      console.log(data.token);
                salvarToken(data.token);
                navigation.push('Autenticado')
            } else {
                alert('Dados Inválidos')
            }
        })
    }
    //<Image ASSETS/>
    return(
        <View style={styles.container}>

        
            <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Digite seu email"
            />

            <TextInput
            style={styles.input}
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button}
            onPress={Logar}
            >
            <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        width: '90%',
        height : 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginTop : 20, 
        padding: 5,
        borderRadius: 6
    },
    button: {
        backgroundColor : 'black',
        width : '90%',
        padding : 10,
        borderRadius : 6, 
        marginTop : 20,
        alignItems : 'center', 
        justifyContent : 'center'

    },
    textButton : {
        color : 'white'
    }
  });

export default Login;