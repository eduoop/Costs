import styles from './Company.module.css'
import LinkButton from '../layouts/LinkButton'
import InProduction from '../../images/inProduction.png'

function Company() {
    return (
        <div className={styles.container}>
          <div className={styles.main_container}>
            <div className={styles.title}>
              <h1>Estamos trabalhando <br/> <span>nisso...</span></h1>

              <div className={styles.action}>
              <LinkButton className={styles.action_space} to="/login" text="Entrar em uma conta"/>
              <LinkButton to="/registerEmail" text="Crie já sua conta"/>
              </div>
            </div>
          </div> 

          <div className={styles.ilustration}>
            <img src={InProduction} alt="Em desenvolvimento"/> 
          </div>    
        </div>
    )
}

export default Company