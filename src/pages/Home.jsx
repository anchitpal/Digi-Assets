import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Loader, Download } from 'lucide-react';

const Star = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-300' : 'text-gray-600'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

const ProductCard = ({ image, title, price, rating, isPurchased, purchaseStatus, onBuy }) => {
  const navigate = useNavigate();
  return (
    <motion.div animate={{ scale: 1.0 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden flex flex-col justify-between mx-auto sm:mx-0 hover:border-indigo-500/50 transition duration-300">
      <div>
        <img className="rounded-t-2xl w-full text-white h-48 object-cover" src={image} alt={title} />
        <div className="px-5 pt-5 pb-2">
          <h5 className="text-xl font-bold tracking-tight text-white line-clamp-1">{title}</h5>
          <div className="flex items-center mt-2.5 mb-4">
            <div className="flex space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} filled={i < rating} />)}
            </div>
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-md ms-3">
              {rating}.0
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/5 mt-auto">
        <span className="text-2xl font-black text-white">${price}</span>
        
        {isPurchased ? (
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={() => navigate('/purchases')}
            className="text-white bg-green-600 hover:bg-green-500 font-bold rounded-xl text-sm px-4 py-2 flex items-center gap-1 cursor-pointer transition shadow-md"
          >
            <Download size={14} />
            Owned
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={onBuy}
            disabled={purchaseStatus === 'purchasing'}
            className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold rounded-xl text-sm px-4 py-2.5 flex items-center gap-1 cursor-pointer transition shadow-md disabled:opacity-50"
          >
            {purchaseStatus === 'purchasing' ? (
              <>
                <Loader className="animate-spin" size={14} />
                <span>Processing</span>
              </>
            ) : (
              <span>Buy Now</span>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const Home = () => {
  const { user, purchaseProduct } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState({});

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data.slice(0, 6)); // Display top 6 assets
      } catch (err) {
        console.error('Failed to fetch homepage products:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  const handleBuyNow = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setPurchaseStatus(prev => ({ ...prev, [productId]: 'purchasing' }));
    try {
      await purchaseProduct(productId);
      setPurchaseStatus(prev => ({ ...prev, [productId]: 'success' }));
      setTimeout(() => {
        navigate('/purchases');
      }, 1500);
    } catch (err) {
      console.error(err);
      setPurchaseStatus(prev => ({ ...prev, [productId]: 'error' }));
      alert(err.response?.data?.message || 'Transaction failed. Please try again.');
    }
  };

  const getProductImage = (product) => {
    if (product.file && (
      product.file.endsWith('.png') || 
      product.file.endsWith('.jpg') || 
      product.file.endsWith('.jpeg') || 
      product.file.endsWith('.webp') ||
      product.file.endsWith('.gif')
    )) {
      return `http://localhost:3000${product.file}`;
    }
    const tagsStr = product.tags ? product.tags.join(' ') : '';
    if (tagsStr.includes('art') || tagsStr.includes('design') || tagsStr.includes('graphic')) {
      return "https://img.freepik.com/free-vector/flat-abstract-wireframe-background_23-2149006216.jpg";
    }
    if (tagsStr.includes('audio') || tagsStr.includes('music')) {
      return "https://cdn.mos.cms.futurecdn.net/EweZgWitzpP2UsDbRBPWYA.jpg";
    }
    if (tagsStr.includes('book') || tagsStr.includes('pdf')) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvIT0v4yBWsTbCcghDrEnqZYpYTi_TgcwMA&s";
    }
    return "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png";
  };

  // Sample static fallbacks if DB has 0 items
  const sampleProducts = [
    {
      _id: 'sample1',
      name: "Ebooks & PDFs",
      price: 79.99,
      rating: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvIT0v4yBWsTbCcghDrEnqZYpYTi_TgcwMA&s"
    },
    {
      _id: 'sample2',
      name: "Audio Files",
      price: 34.50,
      rating: 3,
      image: "https://cdn.mos.cms.futurecdn.net/EweZgWitzpP2UsDbRBPWYA.jpg"
    },
    {
      _id: 'sample3',
      name: "Videos & Animations",
      price: 49.00,
      rating: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDelB6-uhm4jgna5QNJ_F8emzpCPFieL90Q&s"
    },
    {
      _id: 'sample4',
      name: "Software & Tools",
      price: 29.99,
      rating: 2,
      image: "https://media.licdn.com/dms/image/v2/D4E12AQEte1gCuDwsKg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682621909289?e=2147483647&v=beta&t=lLB6nt7kQVLzKaVKdcbuQd477UJYMg11RNWocRUAAss"
    },
    {
      _id: 'sample5',
      name: "Graphics & Design Assets",
      price: 65.00,
      rating: 4,
      image: "https://img.freepik.com/free-vector/flat-abstract-wireframe-background_23-2149006216.jpg"
    },
    {
      _id: 'sample6',
      name: "Courses or Tutorials",
      price: 24.95,
      rating: 3,
      image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
    }
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <>
      <Layout>
        <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
        {/* Hero section */}
        <div className='p-4 sm:p-8 flex flex-col items-center'>
          <h1 className='text-3xl sm:text-6xl font-bold text-center text-gray-300'>Buy & Sell</h1>
          <h1 className='text-4xl sm:text-7xl font-bold text-cyan-400 p-2 sm:p-4 text-center'>Digital Assets</h1>
          <h3 className='text-2xl sm:text-5xl font-bold text-gray-300 text-center'>with Confidence</h3>
          <br className="hidden sm:block" /><br className="hidden sm:block" />
          <p className='text-base sm:text-2xl text-gray-300 text-center font-playwrite-modern pb-4 sm:pb-8'>
            Discover, buy, and sell premium digital art, music, NFTs, and eBooks. Join <br className="hidden sm:block" />
            thousands of creators and collectors in the most trusted digital marketplace.
          </p>
          <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-0">
            <Link to='marketplace'>
            <motion.button animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='rounded-xl sm:m-4 m-3 font-bold p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 hover:from-blue-500 hover:via-green-400 hover:to-indigo-500 cursor-pointer shadow-lg'>
              Explore Marketplace
            </motion.button>
            </Link>
            <Link to='selling'><motion.button animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='rounded-xl sm:m-4 text-gray-300 font-bold border-b-blue-500 p-4 sm:p-6 
            hover:border-b-blue-800 bg-gradient-to-bl from-blue-400 via-40% hover:from-blue-500 hover:via-70% hover:to-blue-200 cursor-pointer shadow-lg'>Start Selling</motion.button></Link>
          </div>
          <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 gap-0 sm:gap-30 p-6 sm:p-12 w-full justify-center'>
            {/* Statistics */}
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center '>
              <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXlmeG9wMXlncXhha2xjcDluNnRidmFrZXczdTNnYWtud3ZtNzdocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qHRB7JyQElM24NT0EG/giphy.gif' alt='Digital Assets' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl text-gray-300 sm:text-2xl'>50K+</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Digital Assets</p>
            </motion.div>
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center p-2 sm:p-4'>
              <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG56dWd4ZG1mdzdpYWFieG5kaGhmZ3E1dGlpZ2c1YzBsZ3ZrNDA3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hZE5xoaM0Oxw4xiqH7/giphy.gif' alt='Active Creators' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl text-gray-300 sm:text-2xl'>10K+</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Active Creators</p>
            </motion.div>
            <motion.div animate={{ scale: 1.1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} className='flex flex-col items-center justify-center p-2 sm:p-4'>
              <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGdra3N6a294czBxa2dwZDBvd2N6enE0bXZjenllYm5hZzVrM2J5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkuTKBRjjGpbPVH7ib/giphy.gif' alt='Secure Transactions' className='w-10 h-10 m-2' />
              <h1 className='font-bold text-xl text-gray-300 sm:text-2xl'>100%</h1>
              <p className='text-gray-300 text-sm sm:text-base'>Secure Transactions</p>
            </motion.div>
          </div>
        </div>

        {/* Trending Products Section */}
        <div className='p-4 sm:p-8 flex flex-col justify-center items-center '>
          <h1 className='font-extrabold text-gray-300 text-2xl sm:text-4xl p-2 sm:p-6 text-center'>Trending Digital Assets</h1>
          <p className='text-base sm:text-2xl text-gray-300 p-2 text-center font-playwrite-modern mb-8'>
            Discover the most popular and high-quality digital assets from our community of talented creators
          </p>

          {/* Dynamic Cards Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 sm:p-8 w-full max-w-6xl mx-auto'>
            {displayProducts.map((product) => {
              const isSample = product._id.startsWith('sample');
              const isPurchased = !isSample && user?.purchased?.some(p => p === product._id || p._id === product._id);
              const status = purchaseStatus[product._id] || 'idle';
              const image = isSample ? product.image : getProductImage(product);
              const rating = isSample ? product.rating : (product._id.charCodeAt(product._id.length - 1) % 2 === 0 ? 5 : 4);
              
              return (
                <ProductCard
                  key={product._id}
                  image={image}
                  title={product.name}
                  price={product.price}
                  rating={rating}
                  isPurchased={isPurchased}
                  purchaseStatus={status}
                  onBuy={isSample ? (() => navigate('/marketplace')) : (() => handleBuyNow(product._id))}
                />
              );
            })}
          </div>

          <Link to='/marketplace' className="mt-8 mb-12">
            <motion.button animate={{ scale: 1.05 }} whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }}
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden tracking-tighter text-white bg-blue-600 rounded-xl group cursor-pointer shadow-lg"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative text-base font-bold" >View All Assets</span>
            </motion.button>
          </Link>
        </div>

        {/* Feature Highlights Section */}
        <div className='p-4 sm:p-8 flex flex-col items-center '>
          <h1 className='text-2xl sm:text-4xl font-bold text-white text-center'>Everything You Need to Succeed</h1>
          <p className='text-base sm:text-2xl text-white pt-2 sm:pt-4 text-center font-playwrite-modern'>
            Our platform provides all the tools and features you need to buy, sell, and manage
          </p>
          <p className='text-base sm:text-2xl text-white text-center mb-8'>digital assets with confidence</p>
          
          <div className='p-4 sm:p-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 w-full'>
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
