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
    </nav>
  )
}

export default Navbar