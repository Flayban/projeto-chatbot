import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import { useAuthentication } from "../Hooks/useAuthentication"
import { useAuthValue } from "../Context/AuthContext"

const Navbar = () => {
  //Navbar variavel para users logados e não logados
  //Users não logados só têm acesso ao Chat bot, Sobre, Registrer e Log in
  //Users logados têm acesso a Base de configuração, Cha bot, Sobre e Log out
  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          {!user &&(
            <>                  
              <li>
                <NavLink to ="/Chatbot" className={({ isActive }) => (isActive ? styles.active : "")}> Chat Bot </NavLink>
              </li>
            </>
          )}
          {user &&(
            <>
              <li>
                <NavLink to ="/BasedeInformacao" className={({ isActive }) => (isActive ? styles.active : "")}> Base de Informação </NavLink>
              </li>
              <li>
                <NavLink to ="/Chatbot" className={({ isActive }) => (isActive ? styles.active : "")}> Chat Bot </NavLink>
              </li>  
            </>
          )}          
        </ul>
        <ul className={styles.links_list}>
          {!user &&(
            <>
              <li>
                <NavLink to ="/Register" className={({ isActive }) => (isActive ? styles.active : "")}> Sing up </NavLink>
              </li>
              <li>
                <NavLink to ="/Login" className={({ isActive }) => (isActive ? styles.active : "")}> Log in </NavLink>
              </li>
            </>
          )}
          <li>
              <NavLink to ="/Sobre" className={({ isActive }) => (isActive ? styles.active : "")}> Sobre </NavLink>
          </li>         
          {user &&(
            <>
              <li>
                <button onClick={logout}>Log out</button>
              </li>
            </>
          )}
          
        </ul>
    </nav>
  )
}

export default Navbar