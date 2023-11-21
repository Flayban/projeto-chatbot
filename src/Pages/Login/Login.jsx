import styles from "./Login.module.css"
import { useState, useEffect } from "react"
import { useAuthentication } from "../../Hooks/useAuthentication"

const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassWord] = useState("")
  const [error, setError] = useState("")

  const {login, error: authError, loading }  = useAuthentication()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    setError("")

    const user = {
        email,
        password
    }
    
    const res = await login(user)
    console.log(user)
  }
  useEffect(()=>{
    if(authError){
        setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
        <h1>Conectar ao chatbot - <span>BeLife</span></h1>
        <form onSubmit={handleSubmit}>            
            <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="E-mail do usuário" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder="Insira sua senha" value={password} onChange={(e) => setPassWord(e.target.value)}/>
            </label>           
            {!loading && <button className="btn">Logar</button>}
            {loading && <button className="btn" disabled >Aguarde</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login