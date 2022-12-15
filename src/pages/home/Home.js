// Estilo
import styles from "./Home.module.css";
// hooks
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"


//componentes
import PostDetail from "../../components/PostDetail"

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }

  }
  return (
    <div className={styles.home}>
      <h1>Publicações mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
        type="text" 
        placeholder="Ou busque por teg" 
        onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark2">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts?.map((post) => <PostDetail key={post.id} post={post}/>)}
        {posts?.length === 0 &&(
          <div className={styles.noposts}>
            <p>Publicações não encontradas :(</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}      
      </div>
    </div>
  )
}

export default Home