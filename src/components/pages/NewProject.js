/* eslint-disable no-label-var */
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
import Form from '../project/Form'
import axios from 'axios'
import { useState } from 'react'
import Message from '../layouts/Message'
import Loader from "../layouts/Loader"

function NewProject() {

  const [hasError, setHasError] = useState()

  const [removeLoading, setRemoveLoading] = useState(true)

  const navigate = useNavigate()

  function createPost(project) {

    setRemoveLoading(false)

    const token = localStorage.getItem('token')

    // initalize const and services
    axios.post("http://127.0.0.1:3333/projects", project, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(response => {
      setRemoveLoading(true)
      navigate('/projects', { state: {message: 'Projeto criado com sucesso!'} })
      console.log(response.data)
    })
    .catch(err => {
      setRemoveLoading(true)
      setHasError(true)
      setTimeout(() => {
        setHasError(false)
      }, 3000)
    })

  }

    return (
        <div className={styles.newproject_container}>
          <h1>Criar Projeto</h1>        
          <p>Crie seus projetos para depois adicionar os serviços</p>  
          <Form handleSubmit={createPost} btnText="Criar projeto"/>
          {!removeLoading && <Loader/>}
          {hasError && <Message msg="Confira os campos" type="error"/>}      
        </div>
    )
}

export default NewProject