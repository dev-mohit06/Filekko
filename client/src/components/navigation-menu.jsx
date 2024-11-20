import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavigationMenu = memo(({ isMenuOpen, setIsMenuOpen, scrolled, logo }) => {
    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to={'/'} className="flex items-center space-x-2 p-4">
                            <img src={logo} alt="Filekko logo" className="h-10 w-10" />
                            <span className="text-2xl font-bold text-white">Filekko</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
                            <Link to={'/contact-us'} href="#how-it-works" className="block py-2 text-gray-300 hover:text-white transition-colors">
                                Contact Us
                            </Link>
                            <Link to={'/auth/login'}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-1.5 rounded-lg overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        Sign In
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                                        whileHover={{ scale: 1.5, rotate: 45 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.button>
                            </Link>
                        </div>
                        <button
                            className="md:hidden menu-button p-2 text-gray-300 hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="mobile-menu md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800"
                        >
                            <div className="px-4 py-2 space-y-2">
                                <a href="#features" className="block py-2 text-gray-300 hover:text-white transition-colors">
                                    Features
                                </a>
                                <a href="#how-it-works" className="block py-2 text-gray-300 hover:text-white transition-colors">
                                    How it Works
                                </a>
                                <Link to={'/contact-us'} href="#how-it-works" className="block py-2 text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                                <a href="#about" className="block py-2 text-gray-300 hover:text-white transition-colors">
                                    About
                                </a>
                                <Link to={'/auth/login'}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-1.5 rounded-lg overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            Sign In
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                                            whileHover={{ scale: 1.5, rotate: 45 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    )
})

export default NavigationMenu