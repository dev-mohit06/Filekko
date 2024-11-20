import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import QueryService from '../common/query-service';
import logo from '../imgs/logo.svg';
import BackgroundDecorations from '../components/background-decorations';
import toast, { Toaster } from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const toastConfig = {
  success: {
    duration: 1000,
    position: 'top-center',
    style: {
      background: '#4caf50',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    }
  },
  error: {
    duration: 1000,
    position: 'top-center',
    style: {
      background: '#f44336',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    }
  }
};

const VerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [isLoading, setIsLoading] = useState(true);

  const verificationMutation = QueryService.useCreate('/auth/verify-email', {
    onSuccess: useCallback(
      (response) => {
        if (response?.status) {
          setVerificationStatus('success');
          toast.success('Email verified successfully!', toastConfig.success);

          // Automatically redirect after 3 seconds
          setTimeout(() => {
            navigate('/auth/login');
          }, 3000);
        }
      },
      [navigate]
    ),
    onError: useCallback(
      (error) => {
        console.log(error);
        const errorMessage = error?.message || 'Verification failed';

        if (errorMessage.toLowerCase().includes('expired')) {
          setVerificationStatus('expired');
        } else {
          setVerificationStatus('error');
        }

        toast.error(errorMessage, toastConfig.error);
      },
      []
    )
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsLoading(true);
        await verificationMutation.mutateAsync({ token });
      } catch (error) {
        // Error handling is done in the mutation's onError callback
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const renderVerificationContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <motion.div variants={itemVariants} className="text-center">
            <Clock className="mx-auto w-16 h-16 text-blue-500 mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-200 mb-2">Verifying Email...</h2>
            <p className="text-gray-400">Please wait while we verify your email address</p>
          </motion.div>
        );
      case 'success':
        return (
          <motion.div variants={itemVariants} className="text-center">
            <CheckCircle2 className="mx-auto w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-200 mb-2">Email Verified!</h2>
            <p className="text-gray-400">You will be redirected to login shortly</p>
          </motion.div>
        );
      case 'error':
      default:
        return (
          <motion.div variants={itemVariants} className="text-center">
            <XCircle className="mx-auto w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-200 mb-2">Verification Failed</h2>
            <p className="text-gray-400">Unable to verify your email. Please try again.</p>
            <Link
              to="/auth/login"
              className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Login <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster />
      <BackgroundDecorations />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center">
          <Link to="/" className="flex justify-center space-x-2">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-10 w-10"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h1 className="text-4xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Filekko
              </span>
            </motion.h1>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl space-y-6 border border-gray-700"
        >
          {renderVerificationContent()}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center space-x-4">
          <Link to="/legal/privacy" className="text-sm text-gray-400 hover:text-gray-300">
            Privacy Policy
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/legal/terms" className="text-sm text-gray-400 hover:text-gray-300">
            Terms of Service
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;