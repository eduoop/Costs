import styles from './ForgotPassword.module.css'
import { useState } from 'react'
import Message from '../layouts/Message'
import {  Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "../layouts/Loader"

const ForgotPassword = () => {

    const redirectUrl = 'http://localhost:3000/update-password'
    const [email, setEmail] = useState('')

    const [isNull, setIsNull] = useState(false)

    const [emailSended, setEmailSanded] = useState(false)
    const [emailNotSended, setEmailNotSanded] = useState(false)

    const [removeLoading, setRemoveLoading] = useState(false)


    const hendleSubmit = (e) => {
        e.preventDefault()
        setRemoveLoading(true)

        console.log(email, redirectUrl)

        if(email.length === 0) {
            setRemoveLoading(false)
            setIsNull(true)
            setTimeout(() => {
                setIsNull(false)
            }, 3000)
        } else {
            axios.post("http://127.0.0.1:3333/users/forgot-password", {
            redirectUrl: redirectUrl,
            email: email
            })
            .then(() => {
                setRemoveLoading(false)
                setEmailSanded(true)
                setTimeout(() => {
                    setEmailSanded(false)
                }, 3000)
            })
            .catch(() => {
                setEmailNotSanded(true)
                setRemoveLoading(false)
                setTimeout(() => {
                    setEmailNotSanded(false)
                }, 3000)
            })
        }
    }

    return (
        <>
             <div className={styles.login}>
            <form className={styles.form} onSubmit={hendleSubmit}>
              <h1 className={styles.title}>Recuperação de senha</h1>

              { isNull && <Message msg="preencha o campo" type="error"/> }
              { emailSended && <Message msg="Email enviado" type="success"/> }
              { emailNotSended && <Message msg="Verifique o email e tente novamente" type="error"/> }

              <p>Preencha com um email válido</p>
                <div className={styles.field}>
                    <input 
                     type="email" 
                     placeholder="Email"
                     name="email" 
                     onChange={e => setEmail(e.target.value)} 
                     id="email"
                     className={styles.space}
                      />
                </div>

                <div className={styles.actions}>
                    <button type="submit">Enviar código</button>
                </div>


                <div className={styles.actions}>
                      <span>Ou</span><Link to='/login'>logar-se</Link>
                </div>
            </form>
            { removeLoading && <Loader/> }
        </div>
        </>
    )
}

export default ForgotPassword