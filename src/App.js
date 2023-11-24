import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

//Hooks
import { useAuthentication } from "./Hooks/useAuthentication";

//Context
import { AuthProvider } from './Context/AuthContext';

//Pages
import BaseInfo from "./Pages/BaseInfo/BaseInfo";
import Chat from "./Pages/Chat/Chat";
import Sobre from "./Pages/Sobre/Sobre";
import Login from "./Pages/Login/Login";
import Register from './Pages/Register/Register';

//Components
import Navbar from './Components/Navbar';

//Responsavel por fazer a inicialização do projeto
//Comunicação dos status de log in ou log out do User
//Responsavel por definir as permições das rotas para os Users, de forma variavel
function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando</p>
  }

  return (
    <div className="App">
      <AuthProvider value = {{user}}>
        <BrowserRouter>
        <Navbar/>
          <div>
            <Routes>
              <Route path='/' element={!user?  <Navigate to='/Chatbot'/> : <BaseInfo/> }/>
              <Route path='/BasedeInformacao' element={ !user?  <Navigate to='/Chatbot'/> : <BaseInfo/> }/>
              <Route path='/Chatbot' element={<Chat/>}/>  
              <Route path='/Sobre' element={<Sobre/>}/> 
              <Route path='/Login' element={!user? <Login/> : <Navigate to = '/Chatbot'/>}/>
              <Route path='/Register' element={!user? <Register/>: <Navigate to = '/Chatbot'/>}/>    
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App;
