import styles from './Login.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/Auth'
import { Link, useLocation } from 'react-router-dom'
import Message from '../layouts/Message'
import Loader from "../layouts/Loader"

const Login = () => {

    const [removeLoading, setRemoveLoading] = useState(true)

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    const { authenticated, login } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [nullFields, setNullFields] = useState()


    const hendleSubmit= (e) => {
        e.preventDefault();

        if(email.length === 0 || password.length === 0) {
            setRemoveLoading(true)
            setNullFields(true)
            setTimeout(() => {
                setNullFields(false)
            }, 3000)
        } 
        else {
            login(email, password)
            setTimeout(() => {
                setRemoveLoading(true)
            }, 3000);
        }
    }

    return (
        <>
          <div className={styles.login}>
              <form className={styles.form} onSubmit={hendleSubmit}>
                <h1 className={styles.title}>Bem vindo de <span>volta</span></h1>
                { message &&  <Message msg="sua conta foi criada com sucesso!" type="success"/>}
                { nullFields &&  <Message msg="Preencha todos os campos" type="error"/>}
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
                      <Link to='/registerEmail'>Crie uma conta</Link> <br/>
                      <Link to='/forgot-password'>Esqueci minha senha</Link>
                  </div>
              </form>
              {!removeLoading && <Loader/>}
          </div>
        </>
    )
}

export default Login