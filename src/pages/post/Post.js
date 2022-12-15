import styles from './post.module.css'

// hooks
import {Link, useParams} from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
  const {id} = useParams()
  const {document: post, loading} = useFetchDocument("posts", id)  
  
    return (
    <div className={styles.post_container}>
        {loading && <p>Carregando post.</p>}
        {post &&(
            <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <h3>Este post trata sobre:</h3>
            {post.tagsArray.map((tag)=>(
                <p key={tag}>
                    {tag}
                </p>
            ))}
            <Link to="/">
              <button className='btn btn-dark'>Voltar</button>
            </Link>
            </>
        )}
    </div>
  )
}

export default Post