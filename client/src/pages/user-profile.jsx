import React from 'react';
import {
    Mail,
    AtSign,
    Twitter,
    Github,
    Instagram,
} from 'lucide-react';
import { motion } from 'framer-motion';
import ResourceCard from '../components/resource-card';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const userData = {
        fullName: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        location: "New York, USA",
        bio: "Full-stack developer passionate about creating beautiful user experiences and solving complex problems with elegant solutions.",
        profilePicture: "https://avatars.githubusercontent.com/u/14329?v=4",
        social: {
            twitter: "https://twitter.com/johndoe",
            github: "https://github.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
        posts: [
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
        ]
    };

    const SocialLink = ({ icon: Icon, platform, value }) => (
        <div className="group py-3">
            <div className="flex items-center gap-4">
                <Link to={value} className="p-2 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
                    <Icon className="w-5 h-5 text-gray-400" />
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto min-h-screen bg-gray-900">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="py-8"
                >
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                        <motion.div variants={item} className="w-32">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-[2px]">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={userData.profilePicture}
                                        alt={userData.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Profile Info */}
                        <motion.div variants={item} className="flex-1">
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold text-white mb-2">{userData.fullName}</h1>
                                <div className="flex items-center gap-4 text-gray-400 mb-4">
                                    <div className="flex items-center gap-2">
                                        <AtSign className="w-4 h-4" />
                                        <span>{userData.username}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{userData.email}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-4">{userData.bio}</p>

                            {/* Social Links */}
                            <div className="flex gap-5">
                                <SocialLink icon={Twitter} platform="twitter" value={userData.social.twitter} />
                                <SocialLink icon={Github} platform="github" value={userData.social.github} />
                                <SocialLink icon={Instagram} platform="instagram" value={userData.social.instagram} />
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                        <h2 className="text-lg font-medium text-gray-400">Uploaded Resources</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                    </div>

                    {/* Posts Section */}
                    <motion.div variants={item} className="space-y-2">
                        {userData.posts.map((post) => (
                            <ResourceCard key={post.id} resource={post} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserProfile;