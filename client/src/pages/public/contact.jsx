import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        position: '',
        type: 'support',
        message: '',
        why: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [-100, 100, -100],
                        y: [-100, 100, -100],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [100, -100, 100],
                        y: [100, -100, 100],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "linear"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Get in Touch
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have questions or suggestions? We'd love to hear from you. Choose a category below and we'll make sure your message gets to the right team. <Link to={'/'} className='text-blue-400 hover:text-blue-300 font-medium'>Go to home</Link>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Organization Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                                    Current Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                                    Contact Type
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="relative flex items-center justify-between bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition-colors">
                                        <div className="flex items-center">
                                            <HelpCircle className="w-5 h-5 text-blue-400 mr-3" />
                                            <span className="text-gray-200">Support</span>
                                        </div>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="support"
                                            checked={formData.type === 'support'}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className={`h-3 w-3 rounded-full ${formData.type === 'support' ? 'bg-blue-500' : 'bg-gray-500'}`} />
                                    </label>
                                    <label className="relative flex items-center justify-between bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition-colors">
                                        <div className="flex items-center">
                                            <MessageSquare className="w-5 h-5 text-purple-400 mr-3" />
                                            <span className="text-gray-200">Suggestion</span>
                                        </div>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="suggestion"
                                            checked={formData.type === 'suggestion'}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className={`h-3 w-3 rounded-full ${formData.type === 'suggestion' ? 'bg-blue-500' : 'bg-gray-500'}`} />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="why" className="block text-sm font-medium text-gray-300 mb-2">
                                    Why are you contacting us?
                                </label>
                                <textarea
                                    id="why"
                                    name="why"
                                    value={formData.why}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Send Message
                                    <Send className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                                    whileHover={{ scale: 1.5, rotate: 45 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;