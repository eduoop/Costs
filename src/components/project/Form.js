import { useState, useEffect } from 'react'
import ButtonSubmit from '../form/ButtonSubmit'
import Input from '../form/Input'
import Select from '../form/Select'
import styles from './Form.module.css'

function Form ({ btnText, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

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

   const handleChange = (e) => {
       setProject({ ...project, [e.target.name]: e.target.value })
   }

   const handleCategory = (e) => {
        setProject({ 
        ...project, 
        category: e.target.options[e.target.selectedIndex].text, 
        categoryId: e.target.value
    })
    }

   const submit = (e) => {
       e.preventDefault();

       handleSubmit(project)
   }
    

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
              type="text" 
              placeholder="Nome do projeto" 
              name="name" 
              text="Nome do projeto"
              handleOnChange={handleChange}
              value={project.name ? project.name : ''}
             />

            <Input 
              type="number" 
              placeholder="Orçamento total" 
              name="budget" 
              text="Orçamento do projeto"
              handleOnChange={handleChange}
              value={project.budget ? project.budget : ''}
              />
            
            <Select 
             name="category_id" 
             text="Selecione a categoria" 
             handleOnChange={handleCategory} 
             options={categories}
             value={project.categoryId ? project.categoryId : ''}
            />
            <ButtonSubmit text={btnText}/>
        </form>
    )
}

export default Form