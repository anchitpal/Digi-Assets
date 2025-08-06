import React from 'react'
import Layout from '../Layout/Layout';

const Upload = () => {
  return (
    <Layout>
      <section className='bg-gradient-to-tr from-violet-600 via-blue-500 to-pink-400 w-full h-64 flex flex-col items-center justify-center text-white gap-5'>
        <h1 className='font-bold text-5xl'>Upload Your Digital Assets</h1>
        <p className='text-xl'>Share your creativity with the world and start earning from your digital creations</p>
      </section>

      {/* <upload className='justify-center items-center flex flex-col w-full shadow-lg rounded-lg bg-white mt-10'>
        <span className='flex items-center justify-start p-6 '>
          <img src="https://images.icon-icons.com/1514/PNG/512/uploadsymbol_105008.png" className='h-8 w-8' alt="" />
          <h2 className='text-xl font-bold mb-4'>Upload Form</h2>
        </span>
        <div className='flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg w-xl h-70 gap-2'>
          <img src="https://images.icon-icons.com/1514/PNG/512/uploadsymbol_105008.png" className='h-12 w-12' alt="" />
          <h3 className='font-medium'>Drag and drop your files here</h3>
          <p className='text-gray-500'>or click to select files from your computer</p>
          <button className='border border-gray-400 p-2 shadow-gray-400 hover:bg-blue-100'>Select Files</button>
          <p className='text-gray-500'>Supported formats: Images, Audio, PDF, Documents (Max 100MB per file)</p>
        </div>
      </upload> */}

      {/* <div className='text-4xl'>Hello</div> */}

    </Layout>
  )
}

export default Upload
