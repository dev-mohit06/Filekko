import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Github, Lock, Mail } from "lucide-react";
import PasswordDialog from "../components/password-dialog";
import DeleteAccountDialog from "../components/delete-account-dialog";

// Rest of the SettingsPage component remains the same
const SettingRow = ({ icon: Icon, title, description, buttonText, buttonStyle = "default", onClick }) => {
  const buttonStyles = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    neutral: "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
  };

  return (
    <motion.div className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-gray-800 gap-4 sm:gap-6">
      <div className="flex items-start sm:items-center gap-4 sm:gap-6">
        <div className="p-2 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors shrink-0">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h3 className="font-medium text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all w-full sm:w-auto ${buttonStyles[buttonStyle]}`}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

const SettingsPage = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlePasswordUpdate = (passwordData) => {
    console.log('Password update:', passwordData);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion confirmed');
  };

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-2">
              Manage your account security and preferences
            </p>
          </div>

          {/* Authentication Section */}
          <section>
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
              <h2 className="text-base sm:text-lg font-medium text-gray-400 whitespace-nowrap">
                Authentication Methods
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>

            <div className="space-y-2">
              <SettingRow
                icon={Lock}
                title="Password Authentication"
                description="Secure your account with a strong password"
                buttonText="Update password"
                onClick={() => setIsPasswordDialogOpen(true)}
              />
              <SettingRow
                icon={Mail}
                title="Google Authentication"
                description="Use your Google account for quick access"
                buttonText="Disconnect"
                buttonStyle="neutral"
              />
              <SettingRow
                icon={Github}
                title="GitHub Authentication"
                description="Connect your GitHub account"
                buttonText="Connect GitHub"
              />
            </div>
          </section>

          {/* Danger Zone */}
          <section>
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900/20 to-transparent" />
              <h2 className="text-base sm:text-lg font-medium text-red-500/80 whitespace-nowrap">
                Danger Zone
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900/20 to-transparent" />
            </div>

            <SettingRow
              icon={AlertTriangle}
              title="Delete Account"
              description="Permanently remove your account and all data"
              buttonText="Delete Account"
              buttonStyle="danger"
              onClick={() => setIsDeleteDialogOpen(true)}
            />
          </section>
        </motion.div>
      </div>

      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSubmit={handlePasswordUpdate}
      />

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default SettingsPage;