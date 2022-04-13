import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"

function Contact() {

  const { logout, authenticated } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

    return (
        <>
          <h1>Contact</h1>
          <p>{ String(authenticated) }</p> 
          <button onClick={handleLogout}>Sair</button>       
        </>
    )
}

export default Contact