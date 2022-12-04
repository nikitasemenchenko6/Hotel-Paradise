import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hotel from './pages/Hotel/Hotel';
import List from './pages/List/List';
import Login from './pages/Login/Login';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<List/>}/>
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
