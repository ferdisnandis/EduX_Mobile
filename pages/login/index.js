import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { url } from '../../utils/constants'
import logo_branco from '../../assets/logo_branco_EduX.png'
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarToken = async (value) => {
        try {
            await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
            // saving error
        }
    }

    async function logarUsuario(){
        const corpo = {
            Email: email,
            Senha: senha
        }
        const response = await fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpo)
        });
        const token = await response.json();
        let usuario = jwt_decode(token.token);
        await AsyncStorage.setItem('salvarToken', token);
        await AsyncStorage.setItem('email', usuario.email);
        await AsyncStorage.setItem('idUsuario', usuario.unique_name);

        navigation.push('Autenticado');

    }

    const Logar = () => {
        logarUsuario();
    }
    //<Image ASSETS/>
    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={logo_branco} />

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
        backgroundColor: '#B126DE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        borderRadius: 6,
        fontSize: '15px'
    },
    button: {
        backgroundColor: 'black',
        width: '90%',
        padding: 10,
        borderRadius: 6,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textButton: {
        color: 'white',
    },
    logo: {
        width: '200px',
        height: '130px',
        resizeMode: 'stretch'
    }
});

export default Login;