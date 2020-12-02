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


const Postagens = () => {
    const [dica, setDicas] = useState([]);

    useEffect(() => {
        ListarDicas()
    },[])

    const ListarDicas = () => {
        fetch( url + 'dica', {
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

    const Item = ({ texto }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{texto}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item texto={item.texto} />
    );

    return (
        <View styles={styles.container}>
            <FlatList
                data={dica}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}


export default Postagens;