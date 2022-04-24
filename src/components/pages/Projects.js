import { useState, useEffect } from "react"
import { getProjects } from "../../services/api"
import Message from "../layouts/Message"
import { useLocation } from "react-router-dom"
import style from './Project.module.css'
import LinkButton from "../layouts/LinkButton"
import Container from "../layouts/Container"
import ProjectCard from "../project/ProjectCard"
import Loader from "../layouts/Loader"
import axios from "axios"

function Projects() {

  const [projects, setProjects] = useState([])

  const [removeLoading, setRemoveLoading] = useState(false)

  const [projectMessage, setProjectMessage] = useState('')
  const [projectMessageError, setProjectMessageError] = useState('')

  const location = useLocation()
  let message = ''
  if(location.state) {
    message = location.state.message
  }

  useEffect(() => {
    (async () => {
      const response = await getProjects()
      setProjects(response.data)
      setRemoveLoading(true)
      // console.log(response.data)
    })()
  }, [])

  function removeProject(id) {
    setRemoveLoading(false)
    const token = localStorage.getItem('token')

    axios.delete(`http://127.0.0.1:3333/projects/${id}`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then((res) => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
      setRemoveLoading(true)
    })
    .catch(() => {
      setProjectMessageError('Algo deu errado!')
      setRemoveLoading(true)
    })
  }

  // if (loading) {
  //   return <div className="loading">Carregando...</div>
  // }

    return (
        <div className={style.project_container}>
          <div className={style.title_container}>
           <h1>Meus projetos</h1>
           <LinkButton to="/newproject" text="Criar projeto"/>
          </div>
          { message && <Message msg={message} type="success"/> }
          { projectMessage && <Message msg={projectMessage} type="success"/> }
          { projectMessageError && <Message msg={projectMessage} type="error"/> }

          <Container customClass="start">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
              id={project.id}
              name={project.name} 
              budget={project.budget}
              category={project.category}
              key={project.id}
              handleRemove={removeProject}
              />
            ))          
          }
          {!removeLoading && <Loader/>}
          {removeLoading && projects.length === 0 && (

            <p>Uau, que vazio</p>

          )}
          </Container>

        </div>
    )
}

export default Projects