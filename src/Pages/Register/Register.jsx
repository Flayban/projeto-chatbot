import { useAuthentication } from "../../Hooks/useAuthentication"
import styles from "./Register.module.css"
import { useState, useEffect } from "react"

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassWord] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {creatUser, error: authError, loading }  = useAuthentication()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    setError("")

    const user = {
        displayName,
        email,
        password
    }

    if(password !== confirmPassword){
        setError("As senhas devem ser iguais!")
        return
    }
    const res = await creatUser(user)
    console.log(user)
  }
  useEffect(()=>{
    if(authError){
        setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
        <h1>Registre-se para poder Editar as configurações do Chatbot</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" name="displayName" required placeholder="Nome do usuário" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </label>
            <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="E-mail do usuário" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder="Insira sua senha" value={password} onChange={(e) => setPassWord(e.target.value)}/>
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input type="password" name="confirmPassword" required placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>            
            {!loading && <button className="btn">Registrar</button>}
            {loading && <button className="btn" disabled >Aguarde</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register