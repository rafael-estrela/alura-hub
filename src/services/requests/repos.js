import api from '../api';

export async function buscaRepositorios(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function filtraRepositorios(nome, postId) {
    try {
        const resultado = await api.get(`/repos?postId=${postId}&name_like=${nome}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function atualizaRepositorio(postId, nome, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        })
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function criaRepositorio(postId, nome, data) {
    try {
        await api.post(`/repos`, {
            name: nome,
            data: data,
            postId: postId
        })
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}