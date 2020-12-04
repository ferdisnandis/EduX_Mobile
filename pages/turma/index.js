import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { url } from '../../utils/constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
        backgroundColor: '#6BFAA0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: '16px',
      },
});

const Turma = () => {
    const [turma , setTurma] = useState ([]) ;

    useEffect( () => {
        ListarTurmas()
    } , [] )

    const ListarTurmas = () => {
        fetch( url + 'turma' , {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTurma( data.data );
                console.log( data.data );
            })
            .catch( err => console.error (err) )
    }

    const Item = ( { descricao } ) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{descricao}</Text>
            </View>
        )
    };
    
    const renderItem = ({ item }) => {
        return (
            <Item descricao={item.descricao} />
        )
    };

    return (
        <View style={styles.container}>
            <Text>
                Turma
            </Text>
            <FlatList
            data={turma}
            renderItem={renderItem}
            keyExtractor={item => item.Id }
            />
        </View>
    )

}

export default Turma;