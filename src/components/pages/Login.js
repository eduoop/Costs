import styles from './Login.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/Auth'
import { Link } from 'react-router-dom'

const Login = () => {

    const { authenticated, login } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const hendleSubmit= (e) => {
        e.preventDefault();


        login(email, password)
    }

    return (
        <>
          <div className={styles.login}>
              <p>{String(authenticated)}</p>
              <form className={styles.form} onSubmit={hendleSubmit}>
                <h1 className={styles.title}>Bem vindo de volta</h1>
                  <div className={styles.field}>
                      <input 
                       type="email" 
                       placeholder="Email"
                       name="email" 
                       value={email} 
                       onChange={e => setEmail(e.target.value)} 
                       id="email"
                       className={styles.space}
                        />
                  </div>

                  <div className={styles.field}>
                      <input 
                       type="password" 
                       name="password" 
                       placeholder="Senha"
                       value={password} 
                       onChange={e => setPassword(e.target.value)} 
                       id="password"
                      />
                  </div>

                  {/* <div className={styles.incorrect_user}>
                      <p>Verifique o email e a senha!!</p>
                  </div> */}

                  <div className={styles.actions}>
                      <button type="submit">Entrar</button>
                  </div>

                  <div className={styles.actions}>
                      <span>Ou</span><Link to='/registerEmail'>crie uma conta</Link>
                  </div>
              </form>
          </div>
        </>
    )
}

export default Login