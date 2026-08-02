import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Filter, Star, Eye, Download, Heart, Menu, Search, Loader } from 'lucide-react';
import Layout from '../Layout/Layout';
import { useAuth } from '../context/AuthContext';

const MarketPlace = () => {
  const { user, purchaseProduct } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter States
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('Newest First');
  const [purchaseStatus, setPurchaseStatus] = useState({});

  const categories = [
    "All Categories",
    "Digital Art",
    "Music & Audio",
    "eBooks",
    "Design Assets",
    "NFTs"
  ];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/products', {
        params: {
          search,
          category,
          maxPrice: priceRange,
          sortBy
        }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load products from marketplace');
    } finally {
      setLoading(false);
    }
  }, [search, category, priceRange, sortBy]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300); // 300ms debounce
    return () => clearTimeout(delayDebounce);
  }, [fetchProducts]);

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

  return (
    <Layout>
      <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-screen'>
        {/* Header Section */}
        <section className='w-full h-64 flex flex-col items-center justify-center text-white gap-5 md:px-0 px-4'>
          <h1 className='font-bold text-5xl tracking-tight'>Digital Marketplace</h1>
          <p className='text-lg text-gray-300'>Discover premium digital assets from talented creators worldwide</p>
          <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search for digital assets (e.g. art, book)...'
              className='w-full px-5 py-3 pl-12 h-12 text-white placeholder-gray-400 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </section>

        {/* Marketplace Contents */}
        <div className="p-4 md:p-8">
          <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-1/4 p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md flex-shrink-0 h-fit">
              <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Filter size={20} className="text-indigo-400" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-gray-900 text-white">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  <span>Max Price</span>
                  <span className="text-indigo-400">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$10</span>
                  <span>$1000</span>
                </div>
              </div>

              {/* Sort By Filter */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="Newest First" className="bg-gray-900 text-white">Newest First</option>
                  <option value="Price: Low to High" className="bg-gray-900 text-white">Price: Low to High</option>
                  <option value="Price: High to Low" className="bg-gray-900 text-white">Price: High to Low</option>
                </select>
              </div>
            </aside>

            {/* Assets Grid */}
            <main className="w-full md:w-3/4">
              <header className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-200">
                  {loading ? 'Searching assets...' : `Showing ${products.length} assets`}
                </h2>
              </header>

              {error && (
                <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl mb-6">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Loader className="animate-spin text-indigo-400" size={48} />
                  <span className="text-gray-400 font-medium">Fetching premium assets...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center backdrop-blur-md">
                  <h3 className="text-xl font-bold text-white mb-2">No Assets Found</h3>
                  <p className="text-gray-400">Try adjusting your keywords or category filters to find what you need.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => {
                    const isPurchased = user?.purchased?.some(p => p === product._id || p._id === product._id);
                    const status = purchaseStatus[product._id] || 'idle';
                    
                    return (
                      <AssetCard 
                        key={product._id} 
                        asset={product} 
                        isPurchased={isPurchased}
                        purchaseStatus={status}
                        onBuy={() => handleBuyNow(product._id)}
                      />
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Reusable Asset Card
const AssetCard = ({ asset, isPurchased, purchaseStatus, onBuy }) => {
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
    
    // Check tags to return category illustrations
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

  const getPrimaryTag = (product) => {
    if (!product.tags || product.tags.length === 0) return 'Digital Asset';
    return product.tags[0].toUpperCase();
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all hover:-translate-y-1 duration-300 backdrop-blur-md">
      {/* Image Container */}
      <div className="relative group">
        <img
          src={getProductImage(asset)}
          alt={asset.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
        />
        {asset.exclusive && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Exclusive
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {getPrimaryTag(asset)}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} className="fill-current" />
              <span className="text-xs font-bold text-gray-300">4.9</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1">{asset.name}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px] leading-relaxed">{asset.Description}</p>
        </div>

        {/* Purchase Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <span className="text-2xl font-black text-white">${asset.price}</span>
          
          {isPurchased ? (
            <button 
              onClick={() => navigate('/purchases')}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center gap-1"
            >
              <Download size={14} />
              Owned
            </button>
          ) : (
            <button 
              onClick={onBuy}
              disabled={purchaseStatus === 'purchasing'}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer flex items-center gap-1"
            >
              {purchaseStatus === 'purchasing' ? (
                <>
                  <Loader className="animate-spin" size={14} />
                  <span>Processing</span>
                </>
              ) : (
                <span>Buy Now</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
