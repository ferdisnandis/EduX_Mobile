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
            <Item nota={item.nota} nome={item.alunoTurma.usuario.nome} obj={item.objetivo.descricao}/>
            );

        const Item = ({ nota, nome, obj }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{nome} - {obj} </Text>
              <Text style={styles.title}>{nota}</Text> 
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
            <Text style={styles.titulo}><b>Ranking</b></Text>
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


export default Ranking;