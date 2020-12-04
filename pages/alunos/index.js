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

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        ListarAlunos()
    }, [])

    const ListarAlunos = () => {
        fetch(url + 'alunoturma', {
            headers: {
                'Constent-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAlunos(data.data);
                console.log(data.data[0].usuario.nome)
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
            <Item descricao={item.usuario.nome} />
        )
    };
    return (
        <View styles={styles.container}>
        <Text style={styles.titulo}><b>Alunos</b></Text>
            <FlatList
                data={alunos}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}

export default Alunos;