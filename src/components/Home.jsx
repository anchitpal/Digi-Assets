import React from 'react'
import Layout from '../Layout/Layout'

const Star = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-300' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 ... rest of path ..." />
  </svg>
);

const ProductCard = ({ image, title, price, rating }) => (
  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
    <img className="p-8 rounded-t-lg" src={image} alt={title} />
    <div className="px-5 pb-5">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h5>
      <div className="flex items-center mt-2.5 mb-5">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => <Star key={i} filled={i < rating} />)}
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
          {rating}.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900">${price}</span>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <Layout>
        {/* Hero section */}
        <div className='p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200'>
          <h1 className='text-6xl font-bold'>Buy & Sell</h1>
          <h1 className='text-7xl font-bold text-cyan-400 p-4'>Digital Assets</h1>
          <h3 className='text-5xl font-bold text-gray-500'>with Confidence</h3>
          <br /><br />
          <p className='text-2xl text-gray-600 text-center'>
            Discover , buy, and sell premium digital art, music, NFTs, and eBooks. Join <br />
            thousands of creators and collectors in the most trusted digital marketplace.
          </p>
          <div>
            <button className='rounded-xl m-4 font-bold p-6 bg-gradient-to-r from-blue-400 via-green-300 to-indigo-400'>
              Explore Marketplace
            </button>
            <button className=' rounded-xl border-2 font-bold border-b-blue-500 p-6 m-6'>Start Selling</button>
          </div>
          <div className='flex items-center space-x-4 gap-30 p-12'>
            {/* Statistics */}
            <div className=' ml-3justify-center items-center'>
              <img src='https://media2.giphy.com/media/v1.../giphy.gif' alt='Twitter' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-2xl'>50K+</h1>
              <p className='text-gray-500'>Digital Assets</p>
            </div>
            <div className='p-4'>
              <img src='https://media1.giphy.com/media/.../giphy.gif' alt='Twitter' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-2xl'>10K+</h1>
              <p className='text-gray-500'>Active Creators</p>
            </div>
            <div className='p-4'>
              <img src='https://media3.giphy.com/media/.../giphy.gif' alt='Twitter' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-2xl'>100%</h1>
              <p className='text-gray-500'>Secure Transactions</p>
            </div>
          </div>
        </div>

        {/* Trending Products Section */}
        <div className='p-8 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200'>
          <h1 className='font-extrabold text-4xl p-6'>Trending Digital Assets</h1>
          <p className='text-2xl text-gray-500 p-2'>
            Discover the most popular and high-quality digital assets from our community of talented creators
          </p>

          {/* Use the component */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-8'>
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

          <button
            className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-blue-600  rounded-md group"
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
            <span className="relative text-base font-semibold">View All Assets</span>
          </button>
        </div>

        <div className='p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200'>
          <h1 className='text-4xl font-bold'>Everything You Need to Succeed</h1>
          <p className='text-2xl text-gray-500 pt-4'>
            Our platform provides all the tools and features you need to buy, sell, and manage
          </p>
          <p className='text-2xl text-gray-500'>digital assets with confidence</p>
        </div>


      </Layout>
    </>
  );
};

export default Home;
