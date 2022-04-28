/* eslint-disable no-label-var */
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
import Form from '../project/Form'
import axios from 'axios'
import { useState } from 'react'
import Message from '../layouts/Message'
import Loader from "../layouts/Loader"

function NewProject() {

  const [hasError, setHasError] = useState('')

  const [removeLoading, setRemoveLoading] = useState(true)

  const navigate = useNavigate()

  function createPost(project) {
    setHasError('')
    setRemoveLoading(false)

    const token = localStorage.getItem('token')

    // initalize const and services
    axios.post("http://127.0.0.1:3333/projects",{
      name: project.name,
      budget: project.budget,
      category: project.category,
      cost: 0
    }, {
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