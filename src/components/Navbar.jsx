import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LogOut, User as UserIcon, LogIn, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className='flex flex-wrap justify-between items-center bg-gray-900 border-b border-gray-800 text-white p-4 relative z-50 min-h-[64px]'>
        <div className='font-bold text-2xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text hover:opacity-90 transition'>
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
        <ul className='hidden sm:flex items-center sm:space-x-1 lg:space-x-4'>
          <Link to='/' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors'><li>Home</li></Link>
          <Link to='/marketplace' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors'><li>Marketplace</li></Link>
          <Link to='/about' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors'><li>About</li></Link>
          <Link to='/contact' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors'><li>Contact Us</li></Link>
          
          {user ? (
            <>
              <Link to='/purchases' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5'>
                <ShoppingBag size={16} />
                <li>My Purchases</li>
              </Link>
              <Link to='/selling' className='hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5'>
                <PlusCircle size={16} />
                <li>Sell Asset</li>
              </Link>
              <div className='h-4 w-[1px] bg-gray-700 mx-2'></div>
              <div className='flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-sm border border-gray-700'>
                <UserIcon size={14} className='text-indigo-400' />
                <span className='font-medium text-gray-200'>{user.name}</span>
              </div>
              <button 
                onClick={logout} 
                className='hover:bg-red-950/30 hover:text-red-400 text-gray-400 px-3 py-2 text-sm font-medium rounded-lg transition flex items-center gap-1.5 cursor-pointer'
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <div className='h-4 w-[1px] bg-gray-700 mx-2'></div>
              <Link to='/login' className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md flex items-center gap-1.5'>
                <LogIn size={16} />
                Login
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-gray-950 border-l border-gray-800 transition-transform duration-300 transform z-40 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } sm:hidden`}
        >
          <ul className='flex flex-col p-6 space-y-4 pt-20 text-base'>
            <Link to='/' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg block transition-colors'>
              <li>Home</li>
            </Link>
            <Link to='/marketplace' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg block transition-colors'>
              <li>Marketplace</li>
            </Link>
            <Link to='/about' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg block transition-colors'>
              <li>About</li>
            </Link>
            <Link to='/contact' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg block transition-colors'>
              <li>Contact Us</li>
            </Link>
            
            {user ? (
              <>
                <div className='h-[1px] bg-gray-800 my-2'></div>
                <Link to='/purchases' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg flex items-center gap-2 transition-colors'>
                  <ShoppingBag size={18} />
                  <li>My Purchases</li>
                </Link>
                <Link to='/selling' onClick={() => setMenuOpen(false)} className='hover:bg-gray-800 p-2.5 rounded-lg flex items-center gap-2 transition-colors'>
                  <PlusCircle size={18} />
                  <li>Sell Asset</li>
                </Link>
                <div className='p-2.5 bg-gray-900 rounded-lg flex items-center gap-2 border border-gray-800'>
                  <UserIcon size={16} className='text-indigo-400' />
                  <span className='font-semibold text-gray-200'>{user.name}</span>
                </div>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className='w-full text-left hover:bg-red-950/20 text-red-400 p-2.5 rounded-lg flex items-center gap-2 transition'
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className='h-[1px] bg-gray-800 my-2'></div>
                <Link to='/login' onClick={() => setMenuOpen(false)} className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg text-center font-bold block transition shadow-md'>
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* Overlay for when the menu is open */}
        {menuOpen && (
          <div
            className='fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/40 z-30 sm:hidden'
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;