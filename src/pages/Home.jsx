import React from 'react'
import Layout from '../Layout/Layout'
import { motion } from 'framer-motion'
import {Link, Navigate} from 'react-router-dom'

const Star = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-300' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 ... rest of path ..." />
  </svg>
);

const ProductCard = ({ image, title, price, rating }) => (
  <motion.div animate={{ scale: 1.0 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="w-full max-w-sm bg-white border border-gray-200 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-lg shadow-sm mx-auto sm:mx-0">
    <img className="p-4 sm:p-8 rounded-t-lg w-full text-white h-48 object-cover" src={image} alt={title} />
    <div className="px-3 sm:px-5 pb-5">
      <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-white">{title}</h5>
      <div className="flex items-center mt-2.5 mb-5">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => <Star key={i} filled={i < rating} />)}
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
          {rating}.0
        </span>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-white">${price}</span>
        <motion.button animate={{ scale: 1.0 }} whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5">
          Add to cart
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  return (
    <>
      <Layout>
        <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
        {/* Hero section */}
        <div className='p-4 sm:p-8 flex flex-col items-center'>
          <h1 className='text-3xl sm:text-6xl font-bold text-center'>Buy & Sell</h1>
          <h1 className='text-4xl sm:text-7xl font-bold text-cyan-400 p-2 sm:p-4 text-center'>Digital Assets</h1>
          <h3 className='text-2xl sm:text-5xl font-bold text-gray-300 text-center'>with Confidence</h3>
          <br className="hidden sm:block" /><br className="hidden sm:block" />
          <p className='text-base sm:text-2xl text-gray-300 text-center'>
            Discover , buy, and sell premium digital art, music, NFTs, and eBooks. Join <br className="hidden sm:block" />
            thousands of creators and collectors in the most trusted digital marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
            <Link to='marketplace'>
            <motion.button animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='rounded-xl sm:m-4 m-3 font-bold p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 hover:from-blue-500 hover:via-green-400 hover:to-indigo-500'>
              Explore Marketplace
            </motion.button>
            </Link>
            <Link to='selling'><motion.button animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='rounded-xl sm:m-4  font-bold border-b-blue-500 p-4 sm:p-6 
            hover:border-b-blue-800 bg-gradient-to-bl from-blue-400 via-40% hover:from-blue-500 hover:via-70% hover:to-blue-200'>Start Selling</motion.button></Link>
          </div>
          <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 gap-0 sm:gap-30 p-6 sm:p-12 w-full justify-center'>
            {/* Statistics */}
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center '>
              <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXlmeG9wMXlncXhha2xjcDluNnRidmFrZXczdTNnYWtud3ZtNzdocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qHRB7JyQElM24NT0EG/giphy.gif' alt='Digital Assets' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl sm:text-2xl'>50K+</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Digital Assets</p>
            </motion.div>
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center p-2 sm:p-4'>
              <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG56dWd4ZG1mdzdpYWFieG5kaGhmZ3E1dGlpZ2c1YzBsZ3ZrNDA3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hZE5xoaM0Oxw4xiqH7/giphy.gif' alt='Active Creators' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl sm:text-2xl'>10K+</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Active Creators</p>
            </motion.div>
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center p-2 sm:p-4'>
              <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGdra3N6a294czBxa2dwZDBvd2N6enE0bXZjenllYm5hZzVrM2J5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkuTKBRjjGpbPVH7ib/giphy.gif' alt='Secure Transactions' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl sm:text-2xl'>100%</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Secure Transactions</p>
            </motion.div>
          </div>
        </div>

        {/* Trending Products Section */}
        <div className='p-4 sm:p-8 flex flex-col justify-center items-center '>
          <h1 className='font-extrabold text-gray-300 text-2xl sm:text-4xl p-2 sm:p-6 text-center'>Trending Digital Assets</h1>
          <p className='text-base sm:text-2xl text-gray-300 p-2 text-center'>
            Discover the most popular and high-quality digital assets from our community of talented creators
          </p>

          {/* Use the component */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 w-full'>
            <ProductCard
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvIT0v4yBWsTbCcghDrEnqZYpYTi_TgcwMA&s"
              title="Ebooks & PDFs"
              price={79.99}
              rating={4}
            />
            <ProductCard
              image="https://cdn.mos.cms.futurecdn.net/EweZgWitzpP2UsDbRBPWYA.jpg"
              title=" Audio Files"
              price={34.50}
              rating={3}
            />
            <ProductCard
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDelB6-uhm4jgna5QNJ_F8emzpCPFieL90Q&s"
              title="Videos & Animations"
              price={49.00}
              rating={5}
            />
            <ProductCard
              image="https://media.licdn.com/dms/image/v2/D4E12AQEte1gCuDwsKg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682621909289?e=2147483647&v=beta&t=lLB6nt7kQVLzKaVKdcbuQd477UJYMg11RNWocRUAAss"
              title="Software & Tools"
              price={29.99}
              rating={2}
            />
            <ProductCard
              image="https://img.freepik.com/free-vector/flat-abstract-wireframe-background_23-2149006216.jpg"
              title="Graphics & Design Assets"
              price={65.00}
              rating={4}
            />
            <ProductCard
              image="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
              title="Courses or Tutorials"
              price={24.95}
              rating={3}
            />
          </div>
          <Link to='/marketplace'>
          <motion.button animate={{ scale: 1.05 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 overflow-hidden tracking-tighter text-white bg-blue-600 rounded-md group mt-4"
          >
            <span
              className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-400 rounded-full group-hover:w-56 group-hover:h-56"
            ></span>
            <span className="absolute bottom-0 left-0 h-full -ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-full opacity-100 object-stretch"
                viewBox="0 0 487 487"
              >
                <path
                  fill-opacity=".1"
                  fill-rule="nonzero"
                  fill="#FFF"
                  d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                ></path>
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-12 h-full -mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="object-cover w-full h-full"
                viewBox="0 0 487 487"
              >
                <path
                  fill-opacity=".1"
                  fill-rule="nonzero"
                  fill="#FFF"
                  d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                ></path>
              </svg>
            </span>
            <span
              className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
            ></span>
            <span className="relative text-sm sm:text-base font-semibold" >View All Assets</span>
          </motion.button>
          </Link>
        </div>

        <div className='p-4 sm:p-8 flex flex-col items-center '>
          <h1 className='text-2xl sm:text-4xl font-bold text-white text-center'>Everything You Need to Succeed</h1>
          <p className='text-base sm:text-2xl text-white pt-2 sm:pt-4 text-center'>
            Our platform provides all the tools and features you need to buy, sell, and manage
          </p>
          <p className='text-base sm:text-2xl text-white text-center'>digital assets with confidence</p>
          {/* This is the options part */}
          <div className='p-4 sm:p-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 w-full'>
            {/* Each card */}
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px]  rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVs5oOehFuyLO7QeLEU4qhHYjZA95RUKTicA&s)] flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Secure Transactions</p>
                <p className="mt-2 text-sm leading-relaxed">Every purchase is protected with bank-level security and smart contract verification.</p>
              </div>
            </div>
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px] rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMHaT7hYjZxFIIFIMs7V7MSO3zt0tAuPV3RQ&s)] bg-contain flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Easy Upload Process</p>
                <p className="mt-2 text-sm leading-relaxed">Upload your digital assets with just a few clicks and start selling immediately.</p>
              </div>
            </div>
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px] rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5-qktDQcdCCgXngQm8mnY_NG_6jWNWAJFA&s)] bg-contain flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Quality Assurance</p>
                <p className="mt-2 text-sm leading-relaxed">All assets are reviewed for quality and authenticity before being listed.</p>
              </div>
            </div>
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px] rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS90ymaGpKGqUzRYiITC2hVlTSb4XC4nrlwQ&s)] flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Instant Downloads</p>
                <p className="mt-2 text-sm leading-relaxed">Get immediate access to your purchased digital assets with lightning-fast delivery.</p>
              </div>
            </div>
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px] rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7NNx-sad-KilcyvQXo3SPWIJFVMWopOUVqQ&s)] flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Creator Support</p>
                <p className="mt-2 text-sm leading-relaxed">Dedicated support team and resources to help creators succeed and grow their business.</p>
              </div>
            </div>
            <div className="relative w-full sm:w-[400px] h-[180px] sm:h-[200px] rounded-[10px] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rYjw7UicfEn0zSDC1xCsrVo2pPpEfaNA4M2r8GwsAYezaWzsoXcvColzbvgujDlNThA&usqp=CAU)] flex items-center justify-center overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group hover:rotate-[-5deg] hover:scale-[1.1] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-4 sm:mb-0">
              <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border transform -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200 to-purple-400">
                <p className="m-0 text-2xl font-bold ">Analytics Dashboard</p>
                <p className="mt-2 text-sm leading-relaxed">Track your sales, views, and performance with comprehensive analytics tools.</p>
              </div>
            </div>
          </div>
        </div>
        </div>

      </Layout>
    </>
  );
};

export default Home;
