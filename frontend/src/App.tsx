import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Movies from "./components/Movies"
import Edit from "./components/Edit"
import Create from "./components/Create"

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default App