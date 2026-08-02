import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, AlertCircle, ShoppingBag, Loader, FileText, ArrowRight, User } from 'lucide-react';
import Layout from '../Layout/Layout';
import { useAuth } from '../context/AuthContext';

const Purchases = () => {
  const { user, token, API_URL } = useAuth();
  const navigate = useNavigate();

  const [purchasedAssets, setPurchasedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchPurchases = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${API_URL}/users/me`);
        setPurchasedAssets(res.data.purchased || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to retrieve purchased assets.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token, navigate, API_URL]);

  const handleDownload = (fileUrl, assetName) => {
    // Open in a new window or trigger download
    const fullUrl = `http://localhost:3000${fileUrl}`;
    window.open(fullUrl, '_blank');
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

  return (
    <Layout>
      <div className="w-screen min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] p-4 md:p-8">
        <div className="container mx-auto max-w-6xl pt-6">
          
          <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 justify-center sm:justify-start">
                <ShoppingBag className="text-indigo-400" size={36} />
                My Purchases
              </h1>
              <p className="text-gray-400 mt-1.5 text-sm sm:text-base">
                Manage and download your owned digital templates, arts, and books
              </p>
            </div>
            
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-sm">
                <User size={16} className="text-indigo-400" />
                <span className="text-gray-300 font-semibold">{user.email}</span>
              </div>
            )}
          </header>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 flex items-center gap-2 max-w-md mx-auto">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader className="animate-spin text-indigo-400" size={48} />
              <span className="text-gray-400 font-semibold">Loading purchases...</span>
            </div>
          ) : purchasedAssets.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto backdrop-blur-md">
              <ShoppingBag size={64} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Purchased Assets</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                You haven't bought any premium resources yet. Browse our marketplace to find tools, art, and guides.
              </p>
              <Link to="/marketplace" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition">
                <span>Explore Marketplace</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedAssets.map((asset) => (
                <div key={asset._id} className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:border-green-500/40 transition-all hover:-translate-y-1 duration-300 backdrop-blur-md">
                  <img
                    src={getProductImage(asset)}
                    alt={asset.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Purchased
                        </span>
                        <span className="text-xs text-gray-400 font-medium">ID: {asset._id.slice(-6)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1">{asset.name}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed min-h-[40px]">{asset.Description}</p>
                    </div>

                    <button
                      onClick={() => handleDownload(asset.file, asset.name)}
                      className="w-full mt-2 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} />
                      Download Files
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Purchases;
