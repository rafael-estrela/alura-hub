import api from '../api'

export async function buscaUsuario(login) {
    try {
        const resultado = await api.get(`/users?login=${login}`)
        return resultado.data[0]
    } catch (error) {
        console.log(error)
        return {}
    }
}