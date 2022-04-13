import { useState, useEffect } from 'react'
import ButtonSubmit from '../form/ButtonSubmit'
import Input from '../form/Input'
import Select from '../form/Select'
import styles from './Form.module.css'

function Form ({ btnText }) {

    const [categories, setCategories] = useState([])

   useEffect(() => {
       fetch("http://127.0.0.1:3333/categories", {
           method: "GET",
           headers: {
               'Content-Type': 'application/json'
           }
       }).then((res) => res.json())
       .then((data) => {
           setCategories(data)
       })
       .catch(err => console.log(err))
   })
    

    return (
        <form className={styles.form}>
            <Input 
              type="text" 
              placeholder="Nome do projeto" 
              name="name" 
              text="Nome do projeto"
             />

            <Input 
              type="number" 
              placeholder="Orçamento total" 
              name="budget" 
              text="Orçamento do projeto"
             />
            
            <Select name="category_id" text="Selecione a categoria" options={categories}/>
            <ButtonSubmit text={btnText}/>
        </form>
    )
}

export default Form