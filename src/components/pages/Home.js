import styles from './Home.module.css'
import savings from '../../images/savings.svg'
import LinkButton from '../layouts/LinkButton'

function Home() {
    return (
        <>
          <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>  
            <p>Começe a gerenciar seus projetos a partir de já</p>
            <LinkButton to="/newproject" text="Criar projeto"/>
            <img src={savings} alt="Costs"/>
          </section>       
        </>
    )
}

export default Home