import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import Loader from "../layouts/Loader"
import Container from "../layouts/Container"
import Form from '../project/Form'
import ButtonSubmit from '../form/ButtonSubmit'
import Message from '../layouts/Message'
import Input from '../form/Input'
import ServiceCard from '../service/ServiceCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Project = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [removeLoad, setRemoveLoad] = useState(true)
    const [service, setService] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    function editPost(project) {
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        // ATUALIZANDO O PROJETO PASSADO PELA URL
        axios.put(`http://127.0.0.1:3333/projects/${id}`, project, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((res) => {
            setProject(res.data)
            setShowProjectForm(false)
            setMessage('Projeto editado com sucesso')
            setType('success')
            console.log('ok')
        })
        .catch((err) => {
            setMessage('Algo deu errado')
            setType('error')
        })
    }

    useEffect(() => {
        // PEGANDO O PROJETO PASSADO POR URL
        axios.get(`http://127.0.0.1:3333/projects/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
              }
        })
        .then(async (res) => {
            await setProject(res.data)
            axios.get(`http://127.0.0.1:3333/services/${id}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                  }
            })
            .then((res) => {
                console.log(res.data)
                setServices(res.data)
            })
            .catch((err) => console.log(err))
        })
        .catch(err => console.log(err))
    }, [])

    function submit(e) {
        setMessage('')
        e.preventDefault();  
        const lastServiceCost = service.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            return false
        }

        setRemoveLoad(false)


        // CRIAÇÃO DE SERVIÇOS
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
        .then((res) => {
            // ATUALIZANDO O CUSTO DO PROJETO
            setShowServiceForm(false)
            axios.put(`http://127.0.0.1:3333/projects/${id}`, {
                name: project.name,
                budget: project.budget,
                category: project.category,
                cost: newCost,
            }, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
            .then((res) => {
                setProject(res.data)
                setShowProjectForm(false)
                setMessage('Serviço adicionado com sucesso')
                setType('success')
                setRemoveLoad(true)
                console.log('ok')
            })
            .catch((err) => {
                setRemoveLoad(true)
                setMessage('Ops... algo deu errado!')
                setType('error')
            })

            // SETANDO OS PROJETOS NA TELA
            axios.get(`http://127.0.0.1:3333/services/${id}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                  }
            })
            .then((res) => {
                setServices(res.data)
            })
            .catch(() => {
                setMessage('Ops... algo deu errado')
                setType('error')
            })
        })
        .catch((err) => {
            setMessage('Ops... Algo deu errado!')
            setRemoveLoad(true)
            setType('error')
        })

    }

    //DELETAR SERVIÇO
    function removeService(serviceId, cost) {
        setRemoveLoad(false)
        axios.delete(`http://127.0.0.1:3333/services/${serviceId}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        }).then(() => {
            setMessage('Serviço removido')
            setType('success')


            const finalCost = project.cost - cost

            project.cost = finalCost

            console.log(finalCost)
            setServices(services.filter((service) => service.id !== serviceId))

            // SETANDO OS SERVIÇOS NA TELA
            axios.put(`http://127.0.0.1:3333/projects/${id}`, {
                name: project.name,
                budget: project.budget,
                category: project.category,
                cost: finalCost,
            }, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
            .then((res) => {
                console.log('ok')
            })
            .catch((err) => {
                setMessage('Ops... algo deu errado!')
                setType('error')
                setRemoveLoad(true)
            })

            // SETANDO OS SERVIÇOS NA TELA
            axios.get(`http://127.0.0.1:3333/services/${id}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                setRemoveLoad(true)
            })
            .catch(() => {
                setMessage('Ops... algo deu errado!')
                setType('error')
                setRemoveLoad(true)
            })
        })
        .catch(() => {
            setMessage('Ops... algo deu errado')
            setType('error')
            setRemoveLoad(true)
        })
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return (
        <>
            {project.name ? (
             <div className={styles.project_details}>
                 <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar' }
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category}
                                </p>
                                <p>
                                    <span>Total de Orçamento</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Ultilizado</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <Form handleSubmit={editPost} btnText="concluir edição" projectData={project} />
                            </div>
                        )}
                    </div>

                    <div className={styles.service_form_container}>
                        { message && <Message msg={message} type={type}/> }
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar' }
                        </button>
                        <div className={styles.project_info}>
                            { showServiceForm && (
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
                                {  !removeLoad && <Loader/> }
                                <ButtonSubmit text="Adicionar serviço"/>
                            </form>
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                    serviceId={service.id}                                
                                    name={service.name}                                
                                    cost={service.cost}                                
                                    description={service.description}                                
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 &&
                            <p>Não ha serviços cadastrados</p>
                        }
                    </Container>
                 </Container>
             </div>
            ) : ( 
                <Loader />
            )}
        </>
    )
}

export default Project