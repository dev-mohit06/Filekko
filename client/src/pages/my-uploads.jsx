import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Eye, EyeOff, ChevronDown } from 'lucide-react';
import ResourceCard from '../components/resource-card';

const MyUploads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibility, setVisibility] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample data - in a real app, this would come from an API
  const resources = [
    {
      id: 1,
      title: "Advanced Mathematics Notes",
      author: "You",
      authorVerified: true,
      category: "mathematics",
      visibility: "public",
      rating: 4.8,
      views: 1200,
      downloads: 450,
      createdAt: "2024-03-15T10:30:00",
      lastUpdated: "2024-03-15",
      description: "Comprehensive notes covering complex analysis, abstract algebra, and topology. Perfect for graduate students.",
      tags: ["calculus", "algebra", "topology"],
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Private Research Paper",
      author: "You",
      authorVerified: true,
      category: "physics",
      visibility: "private",
      rating: 0,
      views: 0,
      downloads: 0,
      createdAt: "2024-03-10T15:45:00",
      lastUpdated: "2024-03-10",
      description: "Ongoing research work - private draft for upcoming physics conference submission.",
      tags: ["research", "quantum-mechanics", "draft"],
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Computer Science Study Guide",
      author: "You",
      authorVerified: true,
      category: "computer-science",
      visibility: "public",
      rating: 4.9,
      views: 3000,
      downloads: 890,
      createdAt: "2024-03-01T09:15:00",
      lastUpdated: "2024-03-20",
      description: "Essential concepts in algorithms, data structures, and system design with practical examples.",
      tags: ["algorithms", "data-structures", "system-design"],
      thumbnail: "/api/placeholder/400/300"
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesVisibility = visibility === 'all' || 
        (visibility === 'public' && resource.visibility === 'public') ||
        (visibility === 'private' && resource.visibility === 'private');

      const date = new Date(resource.createdAt);
      const now = new Date();
      const daysDifference = (now - date) / (1000 * 60 * 60 * 24);

      const matchesDate = dateRange === 'all' ||
        (dateRange === 'week' && daysDifference <= 7) ||
        (dateRange === 'month' && daysDifference <= 30) ||
        (dateRange === 'year' && daysDifference <= 365);

      return matchesSearch && matchesVisibility && matchesDate;
    });
  }, [searchTerm, visibility, dateRange, resources]);

  const sortedResources = useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'popular') return b.downloads - a.downloads;
      return 0;
    });
  }, [filteredResources, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="w-full">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                My Uploads
              </h1>
              <p className="text-gray-400 mt-2">Manage your uploaded resources</p>
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your uploads..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.div 
              className="flex flex-wrap gap-4 items-center"
              variants={itemVariants}
            >
              {/* Visibility Filter */}
              <div className="relative min-w-[140px]">
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="all">All Resources</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Date Filter */}
              <div className="relative min-w-[140px]">
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative min-w-[140px]">
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Resources List */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="divide-y divide-gray-800"
        >
          {sortedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </motion.div>
        
        {sortedResources.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <p className="text-gray-400">No resources found matching your criteria</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default MyUploads;