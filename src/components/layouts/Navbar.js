import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import Container from './Container'

import Logo from '../../images/costs_logo.png'

function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
               <Container>
                <Link to="/"> <img src={Logo} alt='costs'/> </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                    <li className={styles.item}><Link to="/company">Empresa</Link></li>
                    <li className={styles.item}><Link to="/contact">Contato</Link></li>
                    <li className={styles.item_login}><Link to="/login">Login</Link></li>
                </ul>
               </Container>
            </nav>   
        </>
    )
}

export default Navbar