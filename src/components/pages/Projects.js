import { useState, useEffect } from "react"
import { getProjects } from "../../services/api"

function Projects() {

  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const response = await getProjects()
      setProject(response.data)
      setLoading(false)
      // console.log(response.data)
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