import styles from './NewProject.module.css'

import Form from '../project/Form'

function NewProject() {
    return (
        <div className={styles.newproject_container}>
          <h1>Criar Projeto</h1>        
          <p>Crie seus projetos para depois adicionar os serviços</p>        
          <Form btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject