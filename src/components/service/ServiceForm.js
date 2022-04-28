import styles from '../project/Form.module.css'
import { useState } from 'react'
import Input from '../form/Input'
import ButtonSubmit from '../form/ButtonSubmit'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ServiceForm({ handleSubmit, textBtn, serice }) {


    const [service, setService] = useState({})
    const token = localStorage.getItem('token')
    const { id } = useParams()

    function submit(e) {
        e.preventDefault();  
        axios.post("http://127.0.0.1:3333/services", {
            projectId: id,
            name: service.name,
            cost: service.cost,
            description: service.description
        },
        {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return (
        <>
            <form onSubmit={submit} className={styles.form}>
                <Input 
                 type="text"                
                 text="Nome do serviço"
                 name="name"
                 placeholder="insira o nome do serviço"
                 handleOnChange={handleChange}
                />

                <Input 
                 type="number"                
                 text="Custo do serviço"
                 name="cost"
                 placeholder="insira o valor total"
                 handleOnChange={handleChange}
                />

                <Input 
                 type="text"                
                 text="Descrição do serviço"
                 name="description"
                 placeholder="Descreva o serviço"
                 handleOnChange={handleChange}
                />
                <ButtonSubmit text={textBtn}/>
            </form>
        </>
    )
}

export default ServiceForm