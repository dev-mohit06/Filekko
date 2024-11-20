import React, { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import ResourceCard from '../components/resource-card'

// Memoized Header component
// Memoized Header component
const Header = memo(({ searchTerm, onSearchChange }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="top-0 z-10 w-full">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={titleVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Saved Resources
            </h1>
            <p className="text-gray-400 mt-2">Explore and share valuable learning materials effortlessly.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});

// Main ExplorationPage component
const BookmarkPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: "Advanced Mathematics Notes",
      category: "mathematics",
      author: "Sarah Johnson",
      authorVerified: true,
      rating: 4.8,
      views: 1200,
      downloads: 450,
      difficulty: "advanced",
      lastUpdated: "2024-03-15",
      description: "Comprehensive notes covering complex analysis, abstract algebra, and topology.",
      tags: ["calculus", "algebra", "topology"],
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Physics Lab Reports Template",
      category: "physics",
      author: "Michael Chen",
      authorVerified: true,
      rating: 4.5,
      views: 850,
      downloads: 320,
      difficulty: "intermediate",
      lastUpdated: "2024-03-10",
      description: "Professional lab report templates with example data analysis.",
      tags: ["mechanics", "thermodynamics"],
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Computer Science Fundamentals",
      category: "cs",
      author: "Alex Kumar",
      authorVerified: false,
      rating: 4.9,
      views: 2000,
      downloads: 890,
      difficulty: "beginner",
      lastUpdated: "2024-03-20",
      description: "Essential concepts in algorithms, data structures, and system design.",
      tags: ["algorithms", "data structures"],
      thumbnail: "/api/placeholder/400/300"
    }
  ];

  // Memoize filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-screen bg-gray-900">
      <div className="mx-auto flex flex-col">
        <Header
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.section>
              <div className="space-y-2">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>

      <style jsx global>{`
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BookmarkPage;