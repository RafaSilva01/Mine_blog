// Estilo
import styles from "./About.module.css";
import {Link} from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
        <h2>
          Oque e o Mini <span>Blog?</span>
        </h2>
        <p>
          Este Blog consiste num espaço separado para voce poder,
          desabafar sobre a vida, seja partes boas e partes ruins
        </p>
        <Link to="/posts/create" className="btn">
          Criar post
        </Link>
    </div>
  )
}

export default About