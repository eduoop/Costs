import { createContext, useState, useEffect } from "react"
import { api, createSession, getProjects} from '../../services/api'
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        const recorvedUser = localStorage.getItem('user')

        if(recorvedUser) {
            setUser(JSON.parse(recorvedUser))
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
      const response = await createSession(email, password)
      console.log('logou', response.data)

      const loggedUser = response.data.user.email 
      const token = response.data.token.token

      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', token)

      api.defaults.headers.Authorization = `bearer ${token}`

          setUser(loggedUser)
          navigate("/")
    }
  
    const logout = () => {
      console.log('logout')
      localStorage.removeItem('user')
      
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = null

      setUser(null)
      navigate('/login')
    }
    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
         {children}
        </AuthContext.Provider>
    )
}