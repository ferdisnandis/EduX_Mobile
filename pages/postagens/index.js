import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width: '70%',
        backgroundColor: 'white',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        marginLeft: '50px',
        marginRight: '50px',
        padding: 5,
        borderRadius: 6,
        fontSize: '15px'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#410A59',
        color: 'white',
        padding: 8,
        marginTop: '15px',
        marginLeft: '50px',
        marginRight: '50px',
        borderRadius: 5
    },
    item: {
        backgroundColor: '#B126DE',
        padding: 20,
        marginVertical: 15,
        marginHorizontal: 20,
      },
      title: {
        fontSize: '16px',
        textAlign:'center',
        color: 'white',
      },
      titulo: {
          padding : 15,
          textAlign: 'center',
          fontSize: '20px',
          color: 'white',
          backgroundColor: '#F2CF63',
      }
    });


const Postagens = () => {
    const [dica, setDicas] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        ListarDicas()
    }, [])

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

            .then(response => response.json())

            .then(response => {
                if (response !== false) {
                    alert('Dica registrada')
                    ListarDicas()
                    setTexto('')
                }
                else {
                    alert('Dica não registrada')
                    setTexto('')
                }
            })

            .catch(err => console.error(err))
    }


    const Item = ({ texto }) => (
        <View style={styles.item}>
            <Text style={styles.title} >{texto}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item texto={item.texto} />
    );

    return (
        <View styles={styles.container}>

            <Text style={styles.titulo}><b>TimeLine</b></Text>

            <TextInput
                style={styles.input}
               // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={event => setTexto(event)}
                value={texto}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={event => { SalvarDicas(event) }}
            ><Text style={{color: 'white'}}>Publicar</Text>
            </TouchableOpacity>

            <FlatList
                data={dica}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />

        </View>
    )
}


export default Postagens;