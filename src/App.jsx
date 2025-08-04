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
        <Route path='/upload' element={<h1 className='text-3xl text-center mt-20'>Upload Page Coming Soon!</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
