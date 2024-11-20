import { motion } from 'framer-motion';
import { memo } from 'react';
import { BookOpen, Users, FileText} from 'lucide-react';

// Steps Data
const steps = [
  {
    icon: Users,
    title: "Create Account",
    description: "Sign up and create your personalized academic profile in minutes."
  },
  {
    icon: FileText,
    title: "Share Resources",
    description: "Upload and share your study materials with the community."
  },
  {
    icon: BookOpen,
    title: "Start Learning",
    description: "Access shared resources and begin your collaborative learning journey."
  }
];

const StepCard = memo(({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      {index < 2 && (
        <motion.div
          className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
        </motion.div>
      )}
    </motion.div>
  );
});


export {
  steps
}
export default StepCard