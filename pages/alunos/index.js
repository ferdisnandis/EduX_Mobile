import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const Alunos = () => {
    const [alunos , setAlunos] = useStates([]);
    
    useEffect( () => {
        ListarAlunos()
    } , [] )

    const ListarAlunos = () => {
        fetch( url + 'alunos' , {
            headers: {
                'Constent-Type' : 'application/json'
            }
        } )
            .then( response => response.json() )
            .then( data => {
                setAlunos( data.data );
                console.log( data.data )
            } )

            .catch( err => console.error(err) )
    }

    const Item = ( {descricao} ) => {
        return (
            <View style={style.item}>
                <Text style={style.title}> {descricao} </Text>
            </View>
        )
    };
    return (
        <View style={style.container}>
            <FlatList
            data={objetivo}
            renderItem={renderItem}
            keyExtractor={item => item.Id}
            />
        </View>
    )
}

export default Alunos;