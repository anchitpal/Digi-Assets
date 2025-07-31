import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center bg-gray-800 text-white p-4'>
        <div className='font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'><Link to='/'>Digi-Assets </Link></div>
        <ul className='flex justify-around items-center space-x-8'>
          <Link to='/'><li className='hover:font-bold'>Home</li></Link>
          <Link to='/About'><li className='hover:font-bold'>About</li></Link>
          <Link to='/Contact'><li className='hover:font-bold'>Contact Us</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar 
