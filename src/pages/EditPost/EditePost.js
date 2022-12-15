import styles from './EditePost.module.css'

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../../context/AutcContext"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditePost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    setTitle(post?.title)
    setBody(post?.body)
    setImage(post?.image)

    const textTags = post?.tagsArray.join(", ")
    setTags(textTags)

  }, [post])



  const { user } = useAuthValue()
  const { updateDocument, response } = useUpdateDocument("posts")

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
    try {
      new URL(image)
    } catch {
      setFormError("A imagem precisa ser uma URL.")
    }
    // Arrys de teste
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos")
    }

    if (formError) return;

    const data ={
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    // redirect 
    navigate("/dashboard")
  }

  return (
    <div className={styles.create_post}>
      {post && (
        <>
          <h2>Criar post {post.title}</h2>
          <p>Edite sua publicação</p>
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
                placeholder='Uma imagem que representa seu post'
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Previa da image</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteudo: </span>
              <textarea
                name="body"
                required
                placeholder='Conteudo do post'
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tags"
                required
                placeholder='Uma imagem que representa seu post'
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn" disabled>Aguarde</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditePost