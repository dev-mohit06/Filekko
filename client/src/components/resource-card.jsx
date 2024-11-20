import { Star, Download, Share2, ArrowUpRight, Bookmark } from 'lucide-react';
import { memo } from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const ResourceCard = memo(({ resource }) => {
    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={item}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-gray-800"
        >
            <div className="flex items-start gap-6 flex-1 w-full">
                <div className="p-2 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white mb-1">{resource.title}</h3>

                    <div className="flex items-center gap-2 mb-2">
                        <Link to={'users/username'} className="text-sm text-gray-400">{resource.author}</Link>
                        {resource.authorVerified && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-400/10 text-blue-400">
                                Verified
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{resource.description}</p>

                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-400 bg-white/5 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400 bg-white/5 px-2 py-1 rounded-lg">
                            <Download className="w-4 h-4" />
                            <span>{resource.downloads}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 rounded-lg text-xs bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                </motion.button>
                <Link to={'/resource/:id'}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm hover:opacity-90 transition-colors"
                    >
                        Details
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
});

export default ResourceCard