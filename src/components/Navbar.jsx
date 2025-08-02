import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <nav className='flex flex-wrap justify-between items-center bg-gray-800 text-white p-4'>
        <div className='font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>
          <Link to='/'>Digi-Assets</Link>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden block text-white focus:outline-none rounded-full p-2 transition-colors duration-200 hover:bg-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Modern menu icon: 4 dots in a grid */}
          <span className="relative w-7 h-7 flex flex-wrap items-center justify-center gap-1">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full bg-white transition-all duration-300 ${
                  menuOpen ? 'bg-blue-400 scale-125' : ''
                }`}
                style={{
                  margin: '2px',
                }}
              ></span>
            ))}
          </span>
        </button>
        {/* Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:static sm:transform-none sm:bg-transparent sm:shadow-none sm:w-auto sm:h-auto`}
        >
          <ul className="flex flex-col sm:flex-row mt-20 sm:mt-0 space-y-6 sm:space-y-0 sm:space-x-8 px-8 py-6 sm:p-0">
            <Link to='/' onClick={() => setMenuOpen(false)}>
              <li className='hover:font-bold px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-600'>Home</li>
            </Link>
            <Link to='/About' onClick={() => setMenuOpen(false)}>
              <li className='hover:font-bold px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-600'>About</li>
            </Link>
            <Link to='/Contact' onClick={() => setMenuOpen(false)}>
              <li className='hover:font-bold px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-600'>Contact Us</li>
            </Link>
          </ul>
        </div>
          {/* Overlay for mobile drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 backdrop-blur bg-opacity-40 z-40 sm:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

      </nav>
    </div>
  )
}

export default Navbar
