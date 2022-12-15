import styles from "./Register.module.css"

// importando o useEffect
import { useEffect, useState } from 'react'
import { useAuthentication } from "../../hooks/useAuthentication"


const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassord] = useState("")
  const [error, setError] = useState("")
  
// ---===Back-And===---
  const { createUser, error: authError, loading} = useAuthentication();
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    setError("")
    setDisplayName("")
    setEmail("")
    setPassword("")
    setConfirmPassord("")

    const user = {
      displayName,
      email,
      password
    }
    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }
    const res = await createUser(user)

    console.log(user)
  };
  useEffect(() =>{
    if (authError){
      setError(authError)
    }
  }, [authError])
  
  
  return (
    <div className={styles.register}>
      <header>
          <h1>Cadastro</h1>
          <h2>Realize seu cadastro </h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome: </span>
            <input 
              type="text" 
              name="displayName" 
              required 
              placeholder="Nome do usuario"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          
          <label>
            <span>Email: </span>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Endereço de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Senha: </span>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          
          <label>
            <span>Senha: </span>
            <input 
              type="password" 
              name="confirmePassword" 
              required 
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassord(e.target.value)}
            />
          </label>
          {!loading &&<button className="btn">Cadastrar</button>}
          {loading &&<button className="btn" disabled>Aguarde</button>}
          {/* <button className="btn2">Cancelar</button> */}
          {error && <p className="error">{error}</p>}
        </form>
    </header>
    </div>
 
  )
}

export default Register