import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!isLogin) {
      if (!formData.name) {
        setError('Please enter your name.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/marketplace');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-screen min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden"
        >
          {/* Tab Selection */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-4 text-center text-sm font-semibold transition cursor-pointer ${
                isLogin ? 'text-indigo-400 border-b-2 border-indigo-400 bg-white/5' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-4 text-center text-sm font-semibold transition cursor-pointer ${
                !isLogin ? 'text-indigo-400 border-b-2 border-indigo-400 bg-white/5' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {isLogin ? 'Welcome Back' : 'Join Digi-Assets'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {isLogin ? 'Sign in to access your digital assets' : 'Start buying and selling premium digital assets'}
              </p>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-sm flex items-center gap-2"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field (Only on Register) */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password (Only on Register) */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    <span>Please Wait...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
