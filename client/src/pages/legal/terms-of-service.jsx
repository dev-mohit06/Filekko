import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [100, -100, 100],
            y: [-100, 100, -100],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [-100, 100, -100],
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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: November 10, 2024</p>
          </div>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">1. Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using Filekko, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not access or use our service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">2. User Accounts</h2>
              <div className="space-y-3 text-gray-300">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update your account information when necessary</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">3. Acceptable Use</h2>
              <div className="space-y-3">
                <p className="text-gray-300">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Upload or share any unlawful, harmful, or offensive content</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the service</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">4. Intellectual Property</h2>
              <div className="space-y-3 text-gray-300">
                <p>The service and its original content (excluding content provided by users) remain the property of Filekko and are protected by copyright, trademark, and other laws.</p>
                <p>By uploading content, you grant Filekko a non-exclusive license to use, modify, and display the content solely for providing and improving our services.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">5. User Content</h2>
              <div className="space-y-3 text-gray-300">
                <p>You retain all rights to content you upload. However, by sharing content, you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Warrant that you have the right to share such content</li>
                  <li>Grant us permission to store and display your content</li>
                  <li>Accept responsibility for any copyright or other legal claims</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">6. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice, for any breach of these Terms of Service or for any other reason we deem appropriate.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">7. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Filekko and its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">8. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these terms at any time. We will provide notice of any significant changes. Continued use of the service after such modifications constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">9. Contact Information</h2>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-300">For questions about these Terms, please contact:</p>
                <p className="text-gray-300 mt-2">Email: legal@filekko.com</p>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              By using Filekko, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;