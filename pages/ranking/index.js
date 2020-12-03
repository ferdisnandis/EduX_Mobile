import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ranking = () => {
    const [objAluno, setObjetivoAluno] = useState([]);
    //const [nota, setNota] = useState([]);
    const [alunoTurma, setAlunoTurma] = useState([]);

    useEffect(() => {
        ListarObjAluno(),
        ListarAlunoTurma()
    },[])

    const ListarObjAluno = () => {
        fetch(url + 'ObjetivoAluno', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setObjetivoAluno(data.data);
            })
            .catch(err => console.error(err))
    
        }

    const ListarAlunoTurma = () => {
        fetch(url + 'AlunoTurma', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAlunoTurma(data.data);
            })
            .catch(err => console.error(err))
    }

        const renderItem = ({ item }) => (
            <Item nota={item.nota} nome={item.alunoTurma.usuario.nome} />
            );

        const Item = ({ nota, nome }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{nota}</Text>
              <Text style={styles.title}>{nome}</Text> 
            </View>
          );

        //  const OrdenarNumero = () => {
        //      objAluno.sort(function (a, b) {
        //          if (a.nota > b.nota){
        //              return 1;
        //          }
        //          if (a.nota > b.nota) {
        //              return -1
        //          }
        //          return 0
        //      });
        //      console.log(objAluno.nota)
        //  }

           const Ordenar = () => {
             objAluno.sort(function (a, b) {
                 return a.nota - b.nota
             })
             console.log(objAluno);
           }

        return (
            <View styles={styles.container}>
                <FlatList
                data={objAluno.sort((a, b) => b.nota - a.nota)}
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
            backgroundColor: '#6BFAA0',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
          },
          title: {
            fontSize: '16px',
          },
    });


export default Ranking;