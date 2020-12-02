import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
    }
});


const Postagens = () => {
    const [dica, setDicas] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        ListarDicas()
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    const ListarDicas = () => {
        fetch(url + 'dica', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setDicas(data.data);
                console.log(data.data)
            })

            .catch(err => console.error(err))
    }

    async function GetIdUsuario() {
        return await AsyncStorage.getAllKeys();
    }

    async function SalvarDicas(event) {
        event.preventDefault();
        let formdata = new FormData();
        let idUsusario = await AsyncStorage.getItem('idUsuario');
        formdata.append('IdUsuario', idUsusario);
        formdata.append('Texto', texto);
        fetch(url + 'dica', {
            method: 'POST',
            body: formdata,
        })
            .catch(err => console.error(err))
    }

    // const Salvar = () => {
    //    SalvarDicas();
    // }

    const Item = ({ texto }) => (
        <View style={styles.item}>
            <Text>{texto}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item texto={item.texto} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                TimeLine               
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={event => setTexto(event)}
                value={texto}
            />
            <Button
                title="Enviar"
                color="#f194ff"
                onPress={event => { SalvarDicas(event) }}
                onPress={refreshPage}
            />
            <FlatList
                data={dica}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}


export default Postagens;