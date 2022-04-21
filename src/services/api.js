import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
})

export const createSession = async (email, password) => {
    return api.post('/auth', { email, password })
    .catch(function (error) {
        if (error.response) {
          if(error.response.status === 422) {
              alert('preencha todos os campos')
          }

          if(error.response.status === 400) {
              alert('Email e/ou senha incorretos')
          }
        } 
      })
}


export const getProjects = async () => {
const token = localStorage.getItem('token')
    return api.get('/projects', {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}

export const createEmail = async (redirectUrl, email) => {
    return api.post('/users/register', {
            'redirectUrl': redirectUrl,
            'email': email
    })
}