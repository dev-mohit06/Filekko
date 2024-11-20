import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Eye, EyeOff, X } from "lucide-react";

const PasswordDialog = ({ isOpen, onClose, onSubmit }) => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        if (passwordForm.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        onSubmit(passwordForm);
        onClose();
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
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
                            <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 border-b border-gray-800/50">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Update Password
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Password Fields */}
                                {[
                                    { label: 'Current Password', key: 'current', value: 'currentPassword' },
                                    { label: 'New Password', key: 'new', value: 'newPassword' },
                                    { label: 'Confirm New Password', key: 'confirm', value: 'confirmPassword' }
                                ].map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            {field.label}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type={showPasswords[field.key] ? "text" : "password"}
                                                value={passwordForm[field.value]}
                                                onChange={(e) => setPasswordForm(prev => ({
                                                    ...prev,
                                                    [field.value]: e.target.value
                                                }))}
                                                className="w-full bg-gray-800/30 border border-gray-700 rounded-xl px-4 py-2.5 text-white 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                                   group-hover:border-gray-600 transition-all duration-200"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility(field.key)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                                   text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                                            >
                                                {showPasswords[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}

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
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                               text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                                    >
                                        Update Password
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

export default PasswordDialog;