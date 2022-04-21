import { useState } from 'react'
import styles from './Cadastro_email.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Cadastro_email = () => {

    const [email, setEmail] = useState('')
    const redirectUrl = 'http://localhost:3000/register'

    const hendleSubmit = (e) => {
        e.preventDefault()
        if(email === '') {
            alert('Preencha o campo')
        } else {
            alert(`Um email foi enviado para: ${email}`)
        }
        axios.post("http://127.0.0.1:3333/users/register", { email: email, redirectUrl: redirectUrl })
    }

    return (
        <>
        <div className={styles.login}>
            <form className={styles.form} onSubmit={hendleSubmit}>
              <h1 className={styles.title}>Bem vindo ao Costs</h1>
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
        </div>
      </>
    )
}

export default Cadastro_email