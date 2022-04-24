import { useState } from 'react'
import styles from './Cadastro_email.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Message from "../layouts/Message"
import Loader from "../layouts/Loader"

const Cadastro_email = () => {

    const [email, setEmail] = useState('')
    const redirectUrl = 'http://localhost:3000/register'
    const [isNull, setIsNull] = useState(false)
    const [emailSanded, setEmailSanded] = useState(false)
    const [emailUsed, setEmailUsed] = useState(false)

    const [removeLoading, setRemoveLoading] = useState(true)

    const hendleSubmit = (e) => {
        setRemoveLoading(false)
        e.preventDefault()
        if(email === '') {
            setIsNull(true)
            setRemoveLoading(true)
            setTimeout(() => {
                setIsNull(false)
            }, 3000)
        } else {
        axios.post("http://127.0.0.1:3333/users/register", { email: email, redirectUrl: redirectUrl })
        .then(() => {
            setEmailSanded(true)
            setTimeout(() => {
                setEmailSanded(false)
            }, 3000)
            setRemoveLoading(true)
        })
        .catch((err) => {
            if(email !== '') {
                if(err.response.status === 422) {
                    setEmailUsed(true)
                    setTimeout(() => {
                        setEmailUsed(false)
                    }, 3000)
                }
            }
            console.log(err.response.status)
        })
        }
    }

    return (
        <>
        <div className={styles.login}>
            <form className={styles.form} onSubmit={hendleSubmit}>
              <h1 className={styles.title}>Bem vindo ao Costs</h1>
              { isNull && <Message msg='preencha o campo' type="error"/> }
              { emailUsed && <Message msg='Tente outro email' type="error"/> }
              { emailSanded && <Message msg='Email enviado' type="success"/> }
              <p>Preencha com um email válido</p>
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

                <div className={styles.actions}>
                    <button type="submit">Enviar confirmação</button>
                </div>


                <div className={styles.actions}>
                      <span>Ou</span><Link to='/login'>logar-se</Link>
                </div>
            </form>
            {!removeLoading && <Loader/>}
        </div>
      </>
    )
}

export default Cadastro_email