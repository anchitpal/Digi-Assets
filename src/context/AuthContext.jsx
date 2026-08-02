import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  // Configure axios to include JWT in headers by default if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Verify token on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/users/me`);
        setUser(res.data);
      } catch (err) {
        console.error('Verify token failed:', err.response?.data?.message || err.message);
        // Clear invalid token
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/users/register`, { name, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
  };

  // Cart operations
  const addToCart = (product) => {
    if (!cart.some(item => item._id === product._id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const purchaseProduct = async (productId) => {
    if (!token) throw new Error('Please login to purchase assets');
    const res = await axios.post(`${API_URL}/products/${productId}/purchase`);
    // Refresh user state to update purchases list
    const userRes = await axios.get(`${API_URL}/users/me`);
    setUser(userRes.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      cart,
      login,
      register,
      logout,
      addToCart,
      removeFromCart,
      clearCart,
      purchaseProduct,
      API_URL
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
