import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrochip, FaMagic, FaVideo, FaShieldAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-dark-bg border-b border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary">
              <FaMagic className="text-dark-bg text-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              PixelForge
            </h1>
            <span className="text-xs text-gray-400">Advanced Image Editor</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { path: '/', label: 'Home', icon: <FaMicrochip /> },
              { path: '/image-editor', label: 'Image Editor', icon: <FaMagic /> }
            ].map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-300 hover:text-accent-primary transition-colors duration-300 group"
                >
                  <span>{item.icon}</span>
                  <span className="group-hover:underline">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2 rounded-lg hover:bg-dark-card transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;