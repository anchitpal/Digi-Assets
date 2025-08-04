import React from 'react'
import Layout from '../Layout/Layout'

const MarketPlace = () => {
  return (
    <Layout>
      <section className='bg-gradient-to-tr from-violet-600 via-blue-500 to-pink-400 w-full h-64 flex flex-col items-center justify-center text-white gap-5'>
        <h1 className='font-bold text-5xl'>Digital Marketplace</h1>
        <p className='text-xl'>Discover premium digital assets from talented creators worldwide</p>
        <input type="text" placeholder='Search for digital assets...' className='bg-white p-6 h-10 w-2xl text-black rounded'/>
      </section>

    </Layout>
  )
}

export default MarketPlace
