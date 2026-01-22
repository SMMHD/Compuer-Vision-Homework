import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Allow animation to complete
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const bgColor = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : 300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg text-white shadow-2xl ${bgColor}`}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {type === 'success' && '✓'}
          {type === 'error' && '✗'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <div>{message}</div>
      </div>
    </motion.div>
  );
};

export default Toast;