import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          <li>
              <NavLink to ="/BasedeInformacao" className={({ isActive }) => (isActive ? styles.active : "")}> Base de Informação </NavLink>
          </li>
          <li>
              <NavLink to ="/Chatbot" className={({ isActive }) => (isActive ? styles.active : "")}> Chat Bot </NavLink>
          </li>
        </ul>
        <ul className={styles.links_list}>
          <li>
              <NavLink to ="/Login" className={({ isActive }) => (isActive ? styles.active : "")}> Login </NavLink>
          </li>
          <li>
              <NavLink to ="/Sobre" className={({ isActive }) => (isActive ? styles.active : "")}> Sobre </NavLink>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar