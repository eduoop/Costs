/* eslint-disable no-label-var */
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
import Form from '../project/Form'
import axios from 'axios'
import { useState } from 'react'

function NewProject() {

  const history = useNavigate()

  function createPost(project) {

    const token = localStorage.getItem('token')

    // initalize const and services
    axios.post("http://127.0.0.1:3333/projects", project, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(response => {
      history('/projects', {message: 'Projeto criado com sucesso!'})
      console.log(response.data)
    })
    .catch(err => console.log(err))

  }

    return (
        <div className={styles.newproject_container}>
          <h1>Criar Projeto</h1>        
          <p>Crie seus projetos para depois adicionar os serviços</p>        
          <Form handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject