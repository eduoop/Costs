import styles from './Logout.module.css'
import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"


const Logout = () => {

    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <button onClick={handleLogout} className={styles.btnSubmit}>Sair</button>
        </div>
    )
}

export default Logout