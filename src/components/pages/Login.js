import styles from './Login.module.css'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const hendleSubmit= (e) => {
        e.preventDefault();
        console.log("submit", {email}, {password})
    }

    return (
        <>
          <div className={styles.login}>
              <h1 className={styles.title}>Bem vindo de volta</h1>
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