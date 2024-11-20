import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertTriangle } from 'lucide-react';

const DeleteAccountDialog = ({ isOpen, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmText.toLowerCase() !== 'delete my account') {
      setError('Please type "delete my account" to confirm');
      return;
    }
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg mx-4"
          >
            <div className="bg-gray-900 border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Glass effect header */}
              <div className="relative bg-gradient-to-r from-red-900/30 to-gray-900/50 backdrop-blur-xl p-6 border-b border-gray-800/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-red-500/10">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-red-500">
                      Delete Account
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Warning Message */}
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-red-500 font-medium">
                        This action cannot be undone
                      </p>
                      <p className="text-sm text-red-200/70">
                        Deleting your account will permanently remove all your data, including:
                      </p>
                      <ul className="text-sm text-red-200/70 list-disc list-inside space-y-1">
                        <li>All your personal information</li>
                        <li>Your activity history and preferences</li>
                        <li>Any saved settings or configurations</li>
                        <li>Access to any connected services</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Confirmation Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Type "delete my account" to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-gray-800/30 border border-gray-700 rounded-xl px-4 py-2.5 text-white 
                             focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
                             hover:border-gray-600 transition-all duration-200"
                    placeholder="delete my account"
                    required
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <AlertTriangle size={16} />
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl text-gray-300 bg-gray-800/50 
                             hover:bg-gray-800 hover:text-white transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 
                             text-white hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20"
                  >
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountDialog;