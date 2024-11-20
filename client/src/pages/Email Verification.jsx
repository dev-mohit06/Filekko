import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RefreshCcw, Copy, ArrowRight, Mail } from 'lucide-react';
import BackgroundDecorations from '../components/background-decorations';

const VerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
  const [countdown, setCountdown] = useState(0);
  const [copied, setCopied] = useState(false);

  // Simulate verification code
  const verificationCode = "123456";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    // Add resend logic here
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    // Simulate verification process
    setVerificationStatus('loading');
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.5 ? 'success' : 'error');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <BackgroundDecorations />
        {/* Email Preview Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-700/30 border-b border-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">From:</span>
                <span className="text-gray-300">support@example.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Subject:</span>
                <span className="text-gray-300">Verify your email address</span>
              </div>
              <hr className="border-gray-700/50" />
              <div className="space-y-6 pt-4">
                <p className="text-gray-300">Hello,</p>
                <p className="text-gray-300">
                  Thanks for signing up! Please verify your email address by entering the following code:
                </p>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-2xl font-mono text-blue-400 tracking-wider">
                      {verificationCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Input Card */}
        {/* <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-lg p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold">Check your email</h2>
            <p className="text-gray-400">
              We've sent a verification code to your email address
            </p>
          </div>

          <div className="flex gap-2">
            {Array(6).fill(0).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-lg font-mono rounded-lg bg-gray-700/50 border border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all"
          >
            {verificationStatus === 'loading' ? (
              <RefreshCcw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Verify Email</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {verificationStatus === 'success' && (
            <div className="flex items-center space-x-2 text-green-400 bg-green-500/20 p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>Email verified successfully!</span>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-500/20 p-3 rounded-lg">
              <XCircle className="w-5 h-5" />
              <span>Invalid verification code. Please try again.</span>
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              {countdown > 0 ? (
                <span className="text-gray-500">
                  Resend in {countdown}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Click to resend
                </button>
              )}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VerificationPage;
