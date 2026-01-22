import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMagic, FaShieldAlt, FaDownload, FaRocket, FaStar, FaLightbulb } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaMagic className="text-3xl" />,
      title: "Instant Filters",
      description: "Apply 1000+ professional filters with one click"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Privacy Focused",
      description: "All processing happens locally, no data leaves your device"
    },
    {
      icon: <FaDownload className="text-3xl" />,
      title: "High-Res Export",
      description: "Export your creations in stunning high-resolution quality"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,247,255,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              PixelForge
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Advanced Image Editing & Enhancement Platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center"
            >
              <Link to="/image-editor" className="btn-primary px-12 py-4 text-lg">
                <FaRocket className="mr-3" /> Start Editing Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need for professional image editing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card glass-effect text-center p-8 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary mb-6 text-dark-bg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Filters" },
              { number: "24/7", label: "Availability" },
              { number: "99.9%", label: "Uptime" },
              { number: "Pro", label: "Quality" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent-primary mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Before & After
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See the transformation power of PixelForge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card glass-effect overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Original</h3>
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                <FaLightbulb className="text-6xl text-gray-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card glass-effect overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Enhanced</h3>
              <div className="aspect-square bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-lg flex items-center justify-center">
                <FaStar className="text-6xl text-accent-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="card glass-effect max-w-3xl mx-auto p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Ready to Transform Your Images?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creative professionals using PixelForge for advanced image editing and enhancement.
            </p>
            <Link to="/image-editor" className="btn-primary px-8 py-3 inline-flex items-center">
              <FaRocket className="mr-2" /> Launch PixelForge
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <Link to="/" className="text-gray-400 hover:text-accent-primary transition-colors">Home</Link>
            <Link to="/image-editor" className="text-gray-400 hover:text-accent-primary transition-colors">Editor</Link>
          </div>
          <p className="text-gray-500">
            © 2024 PixelForge. Advanced Image Editing Platform.
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            <Link to="/image-editor" className="hover:text-accent-primary transition-colors underline">
              Try it now
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;