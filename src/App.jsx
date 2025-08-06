import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'
import MarketPlace from './components/MarketPlace'
import Selling from './components/Selling'

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
