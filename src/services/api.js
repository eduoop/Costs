import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
})

export const createSession = async (email, password) => {
    return api.post('/auth', { email, password })
}


export const getProjects = async () => {
const token = localStorage.getItem('token')
    return api.get('/projects', {
        headers: {
            'authorization': `bearer ${token}`
        }
    })
}