import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages
import BaseInfo from "./Pages/BaseInfo/BaseInfo";
import Chat from "./Pages/Chat/Chat";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='BasedeInformacao' element={<BaseInfo/>}/>
            <Route path='chatbot' element={<Chat/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
