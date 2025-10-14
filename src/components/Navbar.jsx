import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
  <nav className='flex flex-wrap justify-between items-center bg-gray-800 text-white p-4 relative z-50 min-h-[56px]'>
        <div className='font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>
          <Link to='/'>Digi-Assets</Link>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-white focus:outline-none z-50 w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Animated Hamburger Icon */}
          <div className="space-y-1.5">
            <span className={`block h-[2px] w-7 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-[2px] w-7 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-[2px] w-7 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className='hidden sm:flex sm:space-x-8'>
          <Link to='/'><li className='hover:font-bold px-4 py-2'>Home</li></Link>
          <Link to='/About'><li className='hover:font-bold px-4 py-2'>About</li></Link>
          <Link to='/Contact'><li className='hover:font-bold px-4 py-2'>Contact Us</li></Link>
        </ul>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-gray-900 transition-transform duration-300 transform z-40 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } sm:hidden`}
        >
          <ul className='flex flex-col p-4 space-y-4 pt-20'>
            <Link to='/' onClick={() => setMenuOpen(false)}>
              <li className='hover:bg-gray-700 p-2 rounded-md'>Home</li>
            </Link>
            <Link to='/About' onClick={() => setMenuOpen(false)}>
              <li className='hover:bg-gray-700 p-2 rounded-md'>About</li>
            </Link>
            <Link to='/Contact' onClick={() => setMenuOpen(false)}>
              <li className='hover:bg-gray-700 p-2 rounded-md'>Contact Us</li>
            </Link>
          </ul>
        </div>

        {/* Overlay for when the menu is open */}
        {menuOpen && (
          <div
            className='fixed top-0 left-0 w-full h-full backdrop-blur bg-opacity-50 z-30 sm:hidden'
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;