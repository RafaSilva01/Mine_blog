import styles from './DashBoard.module.css'

// Importando o link
import { Link, link } from 'react-router-dom'

// Hooks

import { useAuthValue } from "../../context/AutcContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from '../../hooks/useDeleteDocument'


const DashBoard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  // posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")

  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className={styles.dashboard}>
      <h2>Galeria</h2>
      <p>Gerencie suas publicações</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className='btn btn-dark'>Criar primeiro posts</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-gold">
                  Editar
                </Link>
                <button onClick={() => deleteDocument(post.id)}
                  className="btn btn-danger">
                  Excluir
                </button>
              </div>
            </div>)}
        </>
      )}

    </div>
  )
}

export default DashBoard