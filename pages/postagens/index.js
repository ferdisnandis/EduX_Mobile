import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { url } from '../../utils/constants'

const Postagens = () => {
    const [texto, setTexto] = useState('');
    const [dica, setDica] = useState([]);
    const [curtidas, setCurtidas] = useState('');
    const [value, onChangeText] = React.useState('Dê sua dica aqui!!! limite de 250 caracteries');

    useEffect(() => {
        Listar();
    }, []);

    const Listar = () => {
        fetch(url + 'dica')
            .then(response => response.json())
            .then(data => {
                setDica(data.data);
                console.log(data.data);
                // limparCampos();
            })
            .catch(err => console.error(err));
    }
    const Curtir = (event, idDica) => {
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('IdUsuario', localStorage.getItem('idUsuario'));
        formdata.append('IdDica', idDica);
        fetch(url + 'curtida', {
            method: 'POST',
            body: formdata,
        })
            .catch(err => console.error(err))
    }

    const Salvar = (event) => {
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('IdUsuario', localStorage.getItem('idUsuario'));
        formdata.append('Texto', texto);
        fetch(url + 'dica', {
            method: 'POST',
            body: formdata,
        })
            .catch(err => console.error(err))
    }
    const UselessTextInput = (props) => {
        return (
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                maxLength={250}
            />
        );
    }

    const renderItem = (item) => {
        return (
            <View
                style={{
                    backgroundColor: value,
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <UselessTextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                <Button
                    title="Enviar"
                    onPress={(event => { Salvar(event) })}
                />
                <View>
                    <Text style={styles.baseText}>
                        <Text style={styles.titleText} onPress={onPressTitle}>
                            {dica.Listar}
                            {"\n"}
                            {"\n"}
                        </Text>
                        <Text numberOfLines={5}>{bodyText}</Text>
                    </Text>
                </View>
            </View>

        );
    }
}
export default Postagens;