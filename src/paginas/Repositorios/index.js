import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';
import { buscaRepositorios, filtraRepositorios } from '../../services/requests/repos';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');

    const estaNaTela = useIsFocused()

    const filtra = async (nomeRepo) => {
        const resultado = await filtraRepositorios(nomeRepo, route.params.id)
        setRepo(resultado)
    }

    useEffect(() => {
        const busca = async () => {
            const resultado = await buscaRepositorios(route.params.id)
            setRepo(resultado)
        }
        busca()
    }, [estaNaTela])

    return (
        <View style={estilos.container}>
                <TextInput
                    placeholder="Busque por repositórios do usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeRepo}
                    onChangeText={setNomeRepo}/>

                <TouchableOpacity style={estilos.botao} onPress={() => filtra(nomeRepo)}>
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                <FlatList
                    data={repo}
                    style={{width: '100%'}}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.navigate('InfoRepositorio', {item})} style={estilos.repositorio}>
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.Data}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>}
                    keyExtractor={repo => repo.id} />
        </View>
    );
}
