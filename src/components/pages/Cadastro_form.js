import { useEffect, useState } from "react"
import styles from './Cadastro_form.module.css'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Message from "../layouts/Message"
import Loader from "../layouts/Loader"

function Cadastro_form() {

    const { key } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://127.0.0.1:3333/users/register/${key}`)
        .then(response => {
            setEmail(response.data.email)
        })
        .catch(error => {
            console.log(error)
            alert('Ops, algo deu errado')
        })
    }, [key])

    const [removeLoading, setRemoveLoading] = useState(false)

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()
    const [email, setEmail] = useState()

    const [nullCamps, setNullCamps] = useState(false)
    const [passwordsIncorect, setPasswordsIncorect] = useState(false)
    const [shortPassword, setShortPassword] = useState(false)

    // var incorrectPassword = false

    const hendleSubmit = (e) => {
        e.preventDefault();
        setRemoveLoading(true)
        if (password !== passwordConfirmation) {
            setPasswordsIncorect(true)
            setRemoveLoading(false)

            if(setPasswordConfirmation) {
                setTimeout(() => {
                    setPasswordsIncorect(false)
                }, 3000)
            }

            // alert('Senhas não coincidem')
        }
        else if(password < 6 || passwordConfirmation < 6) {
            setShortPassword(false)
            setTimeout(() => {
                setShortPassword(false)
            }, 3000)
        }        
        else {
            axios.put("http://127.0.0.1:3333/users/register", { 
            key: key,
            name: name,
            password: password,
            passwordConfirmation: passwordConfirmation
         })
         .then(response => {
             setRemoveLoading(true)
            navigate('/login', { state: {message: 'A sua conta foi criada com sucesso!'} })
         })
         .catch(function (error) {
            setRemoveLoading(false)
            if (error.response) {
              if(error.response.status === 422) {
                //   alert('preencha todos os campos')
                  setNullCamps(true)
                  if(setNullCamps) {
                    setTimeout(() => {
                        setNullCamps(false)
                    }, 3000)
                }
              }
    
              if(error.response.status === 400) {
                  alert('Email e/ou senha incorretos')
              }
            } 
          })
        }

    }

    return (
        <>
          <div className={styles.login}>
              <form className={styles.form} onSubmit={hendleSubmit}>
              <h1 className={styles.title}>Estamos quase prontos...</h1>
                { passwordsIncorect && <Message msg='As senhas estão diferentes' type="error"/> }
                { nullCamps && <Message msg='Preencha todos os campos' type="error"/> }
                { shortPassword && <Message msg='A senha deve ter no minimo 6 caracters' type="error"/> }
                  <div className={styles.field}>
                      <input 
                       placeholder={email}
                       id="email"
                       disabled
                       className={styles.space}
                        />
                  </div>

                  <div className={styles.field}>
                      <input 
                       type="text" 
                       placeholder="Nome"
                       name="nome" 
                       onChange={e => setName(e.target.value)} 
                       id="name"
                       className={styles.space}
                        />
                  </div>

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

                  {/* { incorrectPassword ? <div className={styles.actions}>
                     <p>Ops, as senhas estão diferentes!</p>
                    </div> : ''} */}

                  <div className={styles.actions}>
                      <button type="submit">Criar</button>
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
export default Cadastro_form