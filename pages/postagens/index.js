import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { url } from '../../utils/constants'

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
    const [ Dicas, setDicas] = useState([]);
    
    
    useEffect(() => { 
        ListarDica()
    })



    const ListarDica = () => {
        fetch(url + 'ObjetivoAluno', {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setDicas(data.data);
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
            <Text>Dicas</Text>
            <FlatList
            data={Dicas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
             />
        </View>
    )
}
export default Postagens;