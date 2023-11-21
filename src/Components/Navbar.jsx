import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import { useAuthentication } from "../Hooks/useAuthentication"
import { useAuthValue } from "../Context/AuthContext"

const Navbar = () => {

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
          {user &&(
            <>
              <li>
                <button onClick={logout}>Log out</button>
              </li>
            </>
          )}
          <li>
              <NavLink to ="/Sobre" className={({ isActive }) => (isActive ? styles.active : "")}> Sobre </NavLink>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar