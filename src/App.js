import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages
import BaseInfo from "./Pages/BaseInfo/BaseInfo";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/Home/Home";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/BasedeInformacao' element={<BaseInfo/>}/>
            <Route path='/Chatbot' element={<Chat/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
