import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Pages
import BaseInfo from "./Pages/BaseInfo/BaseInfo";
import Chat from "./Pages/Chat/Chat";
import Sobre from "./Pages/Sobre/Sobre";
import Login from "./Pages/Login/Login"
//Components
import Navbar from './Components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div>
          <Routes>
            <Route path='/' element={<Navigate to='/BasedeInformacao'/> }/>
            <Route path='/BasedeInformacao' element={<BaseInfo/>}/>
            <Route path='/Chatbot' element={<Chat/>}/>  
            <Route path='/Sobre' element={<Sobre/>}/> 
            <Route path='Login' element={<Login/>}/>    
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
