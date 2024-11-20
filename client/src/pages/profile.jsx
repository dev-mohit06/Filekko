import { useState, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Twitter,
    Github,
    Instagram,
    AtSign,
    Globe,
    MapPin,
} from "lucide-react";

const ProfileField = memo(
    ({ label, name, value, placeholder, icon: Icon, onChange, className = "" }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">{label}</label>
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
                    </div>
                )}
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 
          focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all
          hover:border-gray-700 ${Icon ? "pl-14" : "pl-4"} ${className}`}
                />
            </div>
        </div>
    )
);

const SocialLink = memo(({ icon: Icon, placeholder, platform, value, onChange }) => (
    <div className="group py-6 border-b border-gray-800">
        <div className="flex items-center gap-6">
            <div className="p-2 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type="text"
                name={platform}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-600 
        focus:outline-none focus:ring-0"
            />
        </div>
    </div>
));

const ProfilePage = () => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        location: "New York, USA",
        bio: "Full-stack developer passionate about creating beautiful user experiences and solving complex problems with elegant solutions.",
        profilePicture: "https://avatars.githubusercontent.com/u/143279799?v=4",
        social: {
            twitter: "https://twitter.com/johndoe",
            github: "https://github.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSocialChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            social: {
                ...prev.social,
                [name]: value,
            },
        }));
    }, []);

    const handleImageClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log("Form submitted:", formData);
        },
        [formData]
    );

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                when: "beforeChildren",
            },
        },
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <AnimatePresence mode="wait">
            <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex-1 max-w-4xl mx-auto px-8 py-12">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-12"
                        layout="position"
                        layoutRoot
                    >
                        <motion.div variants={item} layout className="space-y-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Profile
                            </h1>
                            <p className="text-gray-400">
                                Manage your personal information and social presence
                            </p>
                        </motion.div>

                        {/* Profile Picture Section */}
                        <motion.section variants={item} layout className="space-y-8">
                            <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                                <h2 className="text-lg font-medium text-gray-400">Profile Picture</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={formData.profilePicture}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleImageClick}
                                        className="absolute bottom-0 right-0 p-2 rounded-full bg-gray-800 border border-gray-700 
                                        text-gray-400 hover:text-white transition-all hover:border-gray-600"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        name="profilePicture"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-white mb-1">Profile Picture</h3>
                                    <p className="text-sm text-gray-400">Upload a new profile picture</p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section variants={item} layout className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileField
                                    label="Full Name"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    icon={AtSign}
                                />
                                <ProfileField
                                    label="Username"
                                    name="username"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    icon={AtSign}
                                />
                                <ProfileField
                                    label="Email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={Globe}
                                />
                                <ProfileField
                                    label="Location"
                                    name="location"
                                    placeholder="City, Country"
                                    value={formData.location}
                                    onChange={handleChange}
                                    icon={MapPin}
                                />
                            </div>

                            <div className="mt-6">
                                <ProfileField
                                    label="Bio"
                                    name="bio"
                                    placeholder="Tell us about yourself"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="min-h-[100px] resize-y"
                                />
                            </div>
                        </motion.section>

                        <motion.section variants={item} layout className="space-y-8">
                            <div className="space-y-0">
                                <SocialLink
                                    icon={Twitter}
                                    placeholder="Twitter profile URL"
                                    platform="twitter"
                                    value={formData.social.twitter}
                                    onChange={handleSocialChange}
                                />
                                <SocialLink
                                    icon={Github}
                                    placeholder="GitHub profile URL"
                                    platform="github"
                                    value={formData.social.github}
                                    onChange={handleSocialChange}
                                />
                                <SocialLink
                                    icon={Instagram}
                                    placeholder="Instagram profile URL"
                                    platform="instagram"
                                    value={formData.social.instagram}
                                    onChange={handleSocialChange}
                                />
                            </div>
                        </motion.section>

                        <motion.div variants={item} layout>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 
                text-white hover:opacity-90 transition-all"
                            >
                                Save Changes
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </form>
            </div>
        </AnimatePresence>
    );
};

export default ProfilePage;