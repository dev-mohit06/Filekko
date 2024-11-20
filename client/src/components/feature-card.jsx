import { motion } from 'framer-motion';
import { memo } from 'react';
import { BookOpen, Share2, Users, FileText, Award } from 'lucide-react';

// Features Data
const features = [
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your academic resources seamlessly with peers and study groups."
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Connect with students worldwide and learn together in a supportive environment."
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access a vast library of study materials, notes, and academic resources."
  },
  {
    icon: Award,
    title: "Quality Content",
    description: "Curated content ensures you're learning from the best materials available."
  },
  {
    icon: FileText,
    title: "Smart Organization",
    description: "Keep your study materials organized with intelligent categorization."
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Form and join study groups to collaborate on projects and share knowledge."
  }
];

const FeatureCard = memo(({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
});

export {
  features
}

export default FeatureCard