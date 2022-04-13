import styles from './Login.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/Auth'

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
              <h1 className={styles.title}>Bem vindo de volta</h1>
              <p>{String(authenticated)}</p>
              <form className={styles.form} onSubmit={hendleSubmit}>
                  <div className={styles.field}>
                      <label for="email">Email</label>
                      <input 
                       type="email" 
                       name="email" 
                       value={email} 
                       onChange={e => setEmail(e.target.value)} 
                       id="email"
                        />
                  </div>

                  <div className={styles.field}>
                      <label for="password">Senha</label>
                      <input 
                       type="password" 
                       name="password" 
                       value={password} 
                       onChange={e => setPassword(e.target.value)} 
                       id="password"
                      />
                  </div>

                  <div className={styles.actions}>
                      <button type="submit">Entrar</button>
                  </div>
              </form>
          </div>
        </>
    )
}

export default Login