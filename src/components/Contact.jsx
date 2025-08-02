import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../Layout/Layout';

// This is the main component for the Contact Us page.
// It includes a form for users to submit their information.
const App = () => {
  // Use useState to manage the form data.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to handle the form submission status and messages.
  const [status, setStatus] = useState('');

  // Handles changes to the form inputs and updates the state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    // Simulate an API call to a backend.
    // In a real application, you would replace this with a fetch() call
    // to your server or a service like Firebase, etc.
    try {
      console.log('Form data submitted:', formData);
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      setStatus('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Failed to send your message. Please try again later.');
    }
  };

  return (
    <Layout>

    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Please fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
            ></textarea>
          </div>

          {/* Submission Status Message */}
          {status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`text-center py-2 rounded-lg font-medium ${
                status.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
            disabled={status === 'Submitting...'}
          >
            {status === 'Submitting...' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
    </Layout>
  );
};

export default App;
