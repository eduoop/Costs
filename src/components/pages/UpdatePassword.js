import Message from "../layouts/Message"
import styles from './UpdatePassword.module.css'
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
const UpdatePassword = () => {

    const { key } = useParams()

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [nullCamps, setNullCamps] = useState(false)
    const [incorrectPassword, setIncorrectPassword] = useState(false)

    const [passwordsOk, setPasswordsOk] = useState(false)
    const [reqError, setReqError] = useState(false)
    

    const hendleSubmit = (e) => {
        e.preventDefault()
        if(password.length === 0) {
            setNullCamps(true)
            setTimeout(() => {
                setNullCamps(false)
            }, 3000)

        } 
        
        else if(passwordConfirmation.length === 0) {
            setNullCamps(true)
            setTimeout(() => {
                setNullCamps(false)
            }, 3000)
            
        }

        else if (password !== passwordConfirmation) {
            setIncorrectPassword(true)
            setTimeout(() => {
                setIncorrectPassword(false)
            }, 3000)
        }

        axios.put("http://127.0.0.1:3333/users/forgot-password", {
            key: key,
            password: password,
            passwordConfirmation: passwordConfirmation
        })
        .then(() => {
            setPasswordsOk(true)
            setTimeout(() => {
                setPasswordsOk(false)
            }, 3000)
        })
        .catch((err) => {
            setReqError(true)
            setTimeout(() => {
                setReqError(false)
            }, 3000)
        })
        
    }

    return (
        <>
            <>
          <div className={styles.login}>
              <form className={styles.form} onSubmit={hendleSubmit}>
              <h1 className={styles.title}>Defina sua nova senha</h1>
                {nullCamps && <Message msg="Preencha todos os campos" type="error"/>} 
                {incorrectPassword && <Message msg="As senhas estão diferentes" type="error"/>} 
                {passwordsOk && <Message msg="Sua senha foi alterada com sucesso" type="success"/>} 
                {reqError && <Message msg="Ops, algo deu errado" type="error"/>} 
                  <div className={styles.field}>
                      <input 
                       type="password" 
                       name="password" 
                       placeholder="Senha"
                       onChange={e => setPassword(e.target.value)} 
                       id="password"
                       className={styles.space}
                      />
                  </div>

                  <div className={styles.field}>
                      <input 
                       type="password" 
                       name="password" 
                       placeholder="Confirme a senha"
                       onChange={e => setPasswordConfirmation(e.target.value)} 
                       id="passwordConfirmation"
                      />
                  </div>

                  <div className={styles.actions}>
                      <button type="submit">Criar</button>
                  </div>

                  <div className={styles.actions}>
                      <span>Ou</span><Link to='/login'>logar-se</Link>
                  </div>

              </form>
          </div>
        </>
        </>
    )
}

export default UpdatePassword