import styles from './CreatePost.module.css'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AutcContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatePost = () => {

  const [ title, setTitle] = useState("")
  const [ image, setImage] = useState("")
  const [ body, setBody ] = useState("")
  const [ tags, setTags ] = useState([])
  const [ formError, setFormError  ] = useState("")
  
  const { user } = useAuthValue()
  const { insertDocument, response} = useInsertDocument("posts")
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Colocando para começar com o campo vazio
    setFormError("")
    setTitle("")
    setImage("")
    setBody("")
    setTags("")
    // validando a imagem
    try{
      new URL(image)
    }catch{
      setFormError("A imagem precisa ser uma URL.")
    }
    // Arrys de teste
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


    // checar todos os valores
    if (!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos")
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect 
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
        <h2>Criar post</h2>
        <p>Escreva sobre oque voce estar sentindo agora!!!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>TItulo: </span>
            <input 
            type="text" 
            name="title" 
            required 
            placeholder='Seu titulo'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

          </label>
          <label>
            <span>URL da imagem: </span>
            <input 
            type="text" 
            name="image" 
            required 
            placeholder='Uma iamgem que represente voce'
            onChange={(e) => setImage(e.target.value)}
            value={image}
            />
          </label> 
          <label>
            <span>Conteudo: </span>
            <textarea 
            name="body" 
            required 
            placeholder='Descrição da publicação' 
            onChange= {(e) => setBody(e.target.value)}
            value={body   }
            ></textarea>
          </label>  
          <label>
            <span>Tags: </span>
            <input 
            type="text" 
            name="tags" 
            required 
            placeholder='Tags reacionadas ao sua publicação'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            />
          </label> 
            {!response.loading &&<button className="btn">Cadastrar</button>}
            {response.loading &&<button className="btn" disabled>Aguarde</button>} 
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost