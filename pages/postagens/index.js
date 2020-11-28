import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Postagens = () => {
    const [texto, setTexto] = useState('');
    const [dica, setDica] = useState([]);
    const [curtidas, setCurtidas] = useState('');

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
            .then(response => {
                if (response.ok) {
                    window.location.reload(); 
                    //arumar isso ^
                }
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
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                    //arumar isso ^
                }
            })

            .catch(err => console.error(err))
    }
    
    return(
        <View>
            <Text>Postagens</Text>
        </View>
    )
}

export default Postagens;