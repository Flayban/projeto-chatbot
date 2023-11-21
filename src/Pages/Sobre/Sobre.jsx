import styles from './Sobre.module.css'
import imagem from './image-example.jpg'
const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.bio}>
        <h1 className={styles.name}>David Lucas Flayban</h1>
        <img src={imagem} alt="David Lucas Flayban dos Santos Melo" />
        <p>Estudante universitário na <a href="https://ufape.edu.br" target="_blank" rel="noopener noreferrer"><span class="highlight" >Universidade Federal do Agreste de Pernambuco - UFAPE</span></a> </p>
        <a className={styles.communication} href="https://br.linkedin.com/in/david-lucas-flayban" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-linkedin"></ion-icon></a>
        <a className={styles.communication} href="https://www.instagram.com/lucasflayban/" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-instagram"></ion-icon></a>
        <a className={styles.communication} href="https://github.com/Flayban" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-github"></ion-icon></a>
        <a className={styles.communication} href="https://api.whatsapp.com/send/?phone=5587981211940&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-whatsapp"></ion-icon></a>
        <a className={styles.communication} href="mailto:davidflayban2@hotmail.com, david.flayban@ufape.edu.br" target="_blank" rel="noopener noreferrer"><ion-icon name="mail-outline"></ion-icon></a>
      </div>
      <div className={styles.complement}>     
        <p className={styles.title}><span class="highlight">Desenvolvedor</span></p>
        <p class={styles.description}>Sou graduando em <span class="highlight">Ciência da Computação</span>. Atualmente dedico-me aos estudos, buscando sempre aprender novas habilidades e ferramentas. Também sou prestativo e gosto de colaborar com outros profissionais e estudantes da área, compartilhando conhecimentos e ideias. Busco participar de projetos para adquirir crescimento e experiência profissional e pessoal. Atuo tanto no <span class="highlight">back-end</span> quanto no <span class="highlight">front-end</span></p>
        <h2 className={styles.skillsSectionTitle}>Habilidades:</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillsBox}>
              <p>Front-End</p>
              <i class="devicon-html5-plain colored"></i>
              <i class="devicon-css3-plain colored"></i>
              <i class="devicon-javascript-plain colored"></i>                    
              <i class="devicon-typescript-plain colored"></i>
              <i class="devicon-nodejs-plain colored"></i>
              <i class="devicon-nextjs-plain colored"></i>    
              <i class="devicon-react-plain colored"></i>   
          </div>
          <div className={styles.skillsBox}>
              <p>Back-End </p>
              <i class="devicon-python-plain colored"></i>                                  
              <i class="devicon-java-plain colored"></i>                    
              <i class="devicon-c-plain colored"></i>
              <i class="devicon-javascript-plain colored"></i>                    
              <i class="devicon-typescript-plain colored"></i>
          </div>
          <div className={styles.skillsBox}>
              <p>DataBase</p>
              <i class="devicon-sqlite-plain colored"></i>
              <i class="devicon-mysql-plain colored"></i>
              <i class="devicon-postgresql-plain colored"></i>
              <i class="devicon-firebase-plain colored"></i>
              <i class="devicon-mongodb-plain colored"></i>
              <i class="devicon-couchdb-plain colored"></i>
              <i class="devicon-redis-plain colored"></i>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default About