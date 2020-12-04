import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { url } from '../../utils/constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
        <View styles={styles.container}>
         <Text style={styles.titulo}><b>Turma</b></Text>
            <FlatList
            data={turma}
            renderItem={renderItem}
            keyExtractor={item => item.Id }
            />
        </View>
    )

}

export default Turma;