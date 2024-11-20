import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QueryService from '../common/query-service';
import { localStorageService } from '../common/local-storage';
import logo from '../imgs/logo.svg';
import Google from '../imgs/google.png';
import BackgroundDecorations from '../components/background-decorations';
import { authWithGoogle } from '../common/firebase.js';
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
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 }
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

const SOCIAL_AUTH_METHODS = {
  google: {
    icon: Google,
    label: 'Google',
    method: 'google'
  }
};

const toastConfig = {
  success: {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#4caf50',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    }
  },
  error: {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#f44336',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    }
  }
};

const FormInput = memo(({ label, type, name, value, onChange, placeholder, icon: Icon }) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
        placeholder={placeholder}
        required
      />
      {Icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  </motion.div>
));

const SocialButton = memo(({ provider, onAuth, isLoading }) => {
  const config = SOCIAL_AUTH_METHODS[provider];

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAuth(config.method)}
      disabled={isLoading}
      className={`flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 backdrop-blur-sm transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <img src={config.icon} className="w-5 h-5" alt={config.label} />
      <span className="ml-2 text-gray-300">
        {isLoading ? 'Loading...' : config.label}
      </span>
    </motion.button>
  );
});

const AuthPage = ({ show }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(show === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullname: '',
    avatar: null,
  });

  const toggleView = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const showToast = useCallback((type, message) => {
    if (type === 'success') {
      toast.success(message, toastConfig.success);
    } else if (type === 'error') {
      toast.error(message, toastConfig.error);
    }
  }, []);

  const loginMutation = QueryService.useCreate('/auth/login', {
    onSuccess: useCallback(
      (response) => {
        if (response?.status) {
          localStorageService.saveAuthState({
            token: response.data.token,
            user: response.data.user,
          });
          showToast('success', 'Login successful!');
          navigate('/dashboard');
        }
      },
      [navigate, showToast]
    ),
    onError: useCallback(
      (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'An error occurred';
        showToast('error', errorMessage);
      },
      [showToast]
    ),
  });

  const signupMutation = QueryService.useCreate('/auth/signup', {
    onSuccess: useCallback(
      (response) => {
        if (response?.status) {
          showToast('success', 'Account created successfully!');
          navigate('/auth/login');
        }
      },
      [navigate, showToast]
    ),
    onError: useCallback(
      (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'An error occurred';
        showToast('error', errorMessage);
      },
      [showToast]
    ),
  });

  const handleSocialAuth = useCallback(
    async (provider) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const user = await authWithGoogle();
        const idToken = await user.getIdToken();

        const authData = {
          email: user.email,
          password: idToken,
          authMethod: provider,
        };

        if (isLogin) {
          await loginMutation.mutateAsync(authData);
        } else {
          await signupMutation.mutateAsync({
            ...authData,
          });
        }
      } catch (error) {
        // Mutation onError handles this
      } finally {
        setIsLoading(false);
      }
    },
    [isLogin, loginMutation, signupMutation, isLoading]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return;

      try {
        setIsLoading(true);
        if (isLogin) {
          await loginMutation.mutateAsync({
            email: formData.email,
            password: formData.password,
            authMethod: 'password',
          });
        } else {
          const formDataObj = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) formDataObj.append(key, value);
          });
          formDataObj.append('authMethod', 'password');
          await signupMutation.mutateAsync(formDataObj);
        }
      } catch (error) {
        // Mutation onError handles this
      } finally {
        setIsLoading(false);
      }
    },
    [isLogin, formData, loginMutation, signupMutation, isLoading]
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster />
      <BackgroundDecorations />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial="hidden"
          animate="visible"
          exit="exit"
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
            <motion.p variants={itemVariants} className="text-gray-400">
              {isLogin ? 'Welcome back!' : 'Join the academic community'}
            </motion.p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl space-y-6 border border-gray-700"
          >
            <div className="space-y-6">
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <>
                    <FormInput
                      label="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                    />
                    <FormInput
                      label="Full Name"
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={togglePassword}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/50 backdrop-blur-sm text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid">
                <SocialButton provider="google" onAuth={handleSocialAuth} isLoading={isLoading} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center text-sm">
              <span className="text-gray-400">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <Link
                to={isLogin ? '/auth/sign-up' : '/auth/login'}
                onClick={toggleView}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </motion.div>
          </motion.form>

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
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;