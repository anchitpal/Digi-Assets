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

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
