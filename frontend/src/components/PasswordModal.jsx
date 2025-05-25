// components/PasswordModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const PasswordModal = ({ password, onSave, onClose, themeClasses, error }) => {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when password prop changes
  useEffect(() => {
    if (password) {
      setFormData({
        website: password.website || '',
        username: password.username || '',
        password: password.password || ''
      });
    } else {
      setFormData({
        website: '',
        username: '',
        password: ''
      });
    }
  }, [password]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.website.trim() || !formData.username.trim() || !formData.password.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.website.trim() && formData.username.trim() && formData.password.trim();
  const isEditing = !!password;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.modalBg} rounded-lg w-full max-w-md border ${themeClasses.border} shadow-xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            onClick={onClose}
            className={`p-1 ${themeClasses.hoverBg} rounded transition-colors`}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Website/Title Field */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="website">
                Website/Title <span className="text-red-500">*</span>
              </label>
              <input
                id="website"
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded ${themeClasses.focusBorder} ${themeClasses.text} transition-colors`}
                placeholder="Enter website or title"
                required
              />
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="username">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded ${themeClasses.focusBorder} ${themeClasses.text} transition-colors`}
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-3 py-2 pr-10 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded ${themeClasses.focusBorder} ${themeClasses.text} transition-colors`}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${themeClasses.hoverBg} rounded transition-colors`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed py-2 rounded transition-colors text-white font-medium"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
            </button>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className={`flex-1 ${themeClasses.buttonBg} ${themeClasses.hoverBg} disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded transition-colors font-medium`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;