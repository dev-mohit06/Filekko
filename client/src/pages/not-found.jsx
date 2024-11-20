import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  // Number animation variants
  const numberVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotate: -180
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background animated circles */}
      <motion.div 
        className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{ 
          x: [-100, 100],
          y: [-50, 50],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ 
          x: [100, -100],
          y: [50, -50],
          scale: [1.2, 1, 1.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-8"
          variants={numberVariants}
        >
          <div className="text-9xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              404
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Oops! Page Not Found
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-12"
          variants={itemVariants}
        >
          Looks like you've ventured into uncharted territory. Let's get you back on track!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Home className="mr-2 w-5 h-5" />
                Back to Home
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{ scale: 1.5, rotate: 45 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <span className="relative z-10 flex items-center justify-center">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0"
              whileHover={{ opacity: 1 }}
            />
          </motion.button>
        </motion.div>

        {/* Floating elements animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;