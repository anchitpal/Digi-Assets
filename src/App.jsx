import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MarketPlace from './pages/MarketPlace'
import Selling from './pages/Selling'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/marketplace' element={<MarketPlace/>} />
        <Route path='/selling' element={<Selling/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
