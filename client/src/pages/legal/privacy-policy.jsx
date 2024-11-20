import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-gray-300 mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-gray-700"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: November 10, 2024</p>
          </div>

          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Filekko. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">2. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-200">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Profile picture (optional)</li>
                  <li>Authentication data from third-party providers (if applicable)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">4. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">5. Third-Party Services</h2>
              <p className="text-gray-300 leading-relaxed">
                We may use third-party services like GitHub and Google for authentication. These services have their own privacy policies, and we recommend reviewing their practices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">6. Your Rights</h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">7. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-300">Email: privacy@filekko.com</p>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              By using Filekko, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;