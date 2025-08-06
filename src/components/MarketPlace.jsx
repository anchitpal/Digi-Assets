import React, { useState } from 'react';
import { Sliders, Filter, Star, Eye, Download, Heart, Menu } from 'lucide-react';
import Layout from '../Layout/Layout'; // Assuming the Layout component is in this path.

const MarketPlace = () => {
  // Hardcoded data for the assets to display. This data will be filtered and rendered.
  const initialAssets = [
    {
      id: 1,
      type: 'Digital Art',
      title: 'Neon Dreams Collection',
      author: 'ArtistPro',
      price: 129,
      rating: 4.9,
      views: 245,
      downloads: 1200,
      likes: 89,
      image: 'https://placehold.co/400x300/e9d5ff/8b5cf6?text=Preview',
      isFeatured: true,
    },
    {
      id: 2,
      type: 'Music',
      title: 'Ambient Soundscapes',
      author: 'SoundMaster',
      price: 45,
      rating: 4.8,
      views: 189,
      downloads: 890,
      likes: 156,
      image: 'https://placehold.co/400x300/fecaca/ef4444?text=Preview',
      isFeatured: false,
    },
    {
      id: 3,
      type: 'eBook',
      title: 'Web3 Development Guide',
      author: 'TechGuru',
      price: 89,
      rating: 4.9,
      views: 567,
      downloads: 2100,
      likes: 234,
      image: 'https://placehold.co/400x300/dbeafe/3b82f6?text=Preview',
      isFeatured: true,
    },
  ];

  // State for the price range slider.
  const [priceRange, setPriceRange] = useState(500);

  return (
    <Layout>
      {/* Your original header section */}
      <section className='bg-gradient-to-tr from-violet-600 via-blue-500 to-pink-400 w-full h-64 flex flex-col items-center justify-center text-white gap-5'>
        <h1 className='font-bold text-5xl'>Digital Marketplace</h1>
        <p className='text-xl'>Discover premium digital assets from talented creators worldwide</p>
        <input type="text" placeholder='Search for digital assets...' className='bg-white p-6 h-10 w-2xl text-black rounded'/>
      </section>

      {/* The main marketplace UI, integrated below your header */}
      <div className="bg-gray-100 p-4 md:p-8 font-['Inter']">
        {/* Mobile header (hidden on larger screens) */}
        <div className="flex justify-between items-center bg-white shadow-lg p-4 mb-4 rounded-lg md:hidden">
          <h1 className="text-xl font-bold">Marketplace</h1>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Menu size={24} />
          </button>
        </div>

        {/* Main content container with a flex layout for sidebar and main area */}
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar for filters */}
          <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">Category</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                <option>All Categories</option>
                <option>Digital Art</option>
                <option>Music</option>
                <option>eBooks</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                Price Range: $0 - ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  '--tw-ring-color': 'rgb(168 85 247)',
                  '--tw-ring-offset-color': 'rgb(249 250 251)',
                  '--tw-ring-offset-width': '2px',
                  '--tw-shadow': '0 0 0 3px var(--tw-ring-offset-color), 0 0 0 6px var(--tw-ring-color), var(--tw-shadow-inner)',
                }}
              />
            </div>

            {/* Sort By Filter */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">Sort By</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="w-full md:w-3/4">
            {/* Main header with result count and view toggles */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Showing {initialAssets.length} results
              </h1>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                  <Menu size={20} />
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:bg-gray-200 transition">
                  <Sliders size={20} />
                </button>
              </div>
            </header>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>

            {/* Load More button */}
            <div className="flex justify-center mt-8">
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg border border-purple-200 hover:bg-purple-50 transition transform hover:-translate-y-1">
                Load More Assets
              </button>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

// A reusable component for displaying an individual asset card.
const AssetCard = ({ asset }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105">
      {/* Asset Image */}
      <div className="relative">
        <img
          src={asset.image}
          alt={asset.title}
          className="w-full h-48 object-cover"
        />
        {/* Featured Tag */}
        {asset.isFeatured && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {/* Preview Button (Overlay) */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:text-purple-600 font-bold">
            Preview
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">{asset.type}</span>
          <div className="flex items-center gap-1 text-purple-600">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-semibold">{asset.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{asset.title}</h3>
        <p className="text-sm text-gray-500 mb-4">by {asset.author}</p>

        {/* Stats Section */}
        <div className="flex items-center justify-between mb-4 text-gray-500">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span className="text-xs">{asset.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download size={16} />
            <span className="text-xs">{asset.downloads}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span className="text-xs">{asset.likes}</span>
          </div>
        </div>

        {/* Price and Buy Now Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-2xl font-bold text-gray-900">${asset.price}</span>
          <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-purple-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
