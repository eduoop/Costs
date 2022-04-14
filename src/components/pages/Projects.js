import { useState, useEffect, useContext } from "react"
import { getProjects } from "../../services/api"
import { AuthContext } from "../contexts/Auth"

function Projects() {


  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(true)

  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const response = await getProjects()
      setProject(response.data)
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

    return (
        <>
          <h1>My projects</h1> 
            { project.map((project) => (
              <ul key={project.id}>{project.name}</ul>
            )) }  
        </>
    )
}

export default Projects