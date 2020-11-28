import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ranking = () => {
    const [objAluno, setObjetivoAluno] = useState([]);

    useEffect(() => { 
        ListarObjAluno()
    })

    const ListarObjAluno = () => {
        fetch(url + 'ObjetivoAluno', {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setObjetivoAluno(data.data);
        })
        
        .catch(err => console.error(err))
    }

        const Item = ({ nota, nome }) => (
            <View style={styles.item}>
              <Text>{nome}</Text>   
              <Text style={styles.title}>{nota}</Text>
            </View>
          );
          
        const renderItem = ({ item }) => (
            <Item nota={item.nota} />
            );

        return (
            <View styles={styles.container}>
                <Text>Ranking</Text>
                <FlatList
                data={objAluno}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                 />
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
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
          },
          title: {
            fontSize: 32,
          },
    });


export default Ranking;