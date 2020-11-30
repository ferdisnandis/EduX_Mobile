import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { url } from '../../utils/constants';

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


const Objetivo = () => {
    const [objetivo, setObjetivo] = useState([]);

    useEffect(() => {
        ListarObjetivos()
    },[])


    const ListarObjetivos = () => {
        fetch( url +'objetivo', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setObjetivo(data.data);
                console.log(data.data)
            })

            .catch(err => console.error(err))
    }

    const Item = ({ descricao }) => {
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
        <View styles={styles.container}>
            <Text>
                Objetivos
            </Text>
            <FlatList
                data={objetivo}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />
        </View >
    )
}

export default Objetivo;