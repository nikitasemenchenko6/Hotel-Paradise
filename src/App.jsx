import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hotel from './pages/Hotel/Hotel';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
