// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit, Trash2, Plus, Github, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { passwordService } from '../services/passwordService';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header';
import PasswordList from '../components/PasswordList';
import PasswordModal from '../components/PasswordModal';
import Footer from '../components/Footer';

const Dashboard = () => {
  // States
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hooks
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();

  // Effects
  useEffect(() => {
    fetchPasswords();
  }, []);

  // API Functions
  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const data = await passwordService.getPasswords();
      setPasswords(data || []);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setError('Failed to fetch passwords');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async (formData) => {
    try {
      const newPassword = await passwordService.addPassword(formData);
      setPasswords(prev => [...prev, newPassword]);
      setShowModal(false);
      setError('');
    } catch (error) {
      console.error('Error adding password:', error);
      setError('Failed to add password');
    }
  };

  const handleUpdatePassword = async (formData) => {
    try {
      const updatedPassword = await passwordService.updatePassword(editingPassword._id, formData);
      setPasswords(prev => prev.map(p => 
        p._id === editingPassword._id ? updatedPassword : p
      ));
      setShowModal(false);
      setEditingPassword(null);
      setError('');
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password');
    }
  };

  const handleDeletePassword = async (id) => {
    if (!window.confirm('Are you sure you want to delete this password?')) return;
    
    try {
      await passwordService.deletePassword(id);
      setPasswords(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting password:', error);
      setError('Failed to delete password');
    }
  };

  // UI Handlers
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openAddModal = () => {
    setEditingPassword(null);
    setShowModal(true);
    setError('');
  };

  const openEditModal = (password) => {
    setEditingPassword(password);
    setShowModal(true);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPassword(null);
    setError('');
  };

  // Loading State
  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} flex items-center justify-center`}>
        <div className={`${themeClasses.text} text-xl`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
      <Header 
        user={user}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onLogout={logout}
        themeClasses={themeClasses}
      />
      
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, <span className="text-yellow-500">{user?.name || user?.username || 'User'}</span> 👋
            </h1>
            <p className={`${themeClasses.textSecondary} mb-2`}>
              Save your passwords like a pro 😎
            </p>
            <p className={`${themeClasses.textSecondary} text-sm`}>
              with <span className="font-mono">passman</span>
            </p>
          </div>

          {/* Add Password Button */}
          <button
            onClick={openAddModal}
            className={`${themeClasses.buttonBg} ${themeClasses.hoverBg} px-4 py-2 rounded mb-6 flex items-center space-x-2 transition-colors`}
          >
            <Plus size={16} />
            <span>Save a new password</span>
          </button>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Password List */}
          <PasswordList
            passwords={passwords}
            visiblePasswords={visiblePasswords}
            onToggleVisibility={togglePasswordVisibility}
            onEdit={openEditModal}
            onDelete={handleDeletePassword}
            themeClasses={themeClasses}
          />
        </div>
      </main>

      <Footer themeClasses={themeClasses} />

      {/* Password Modal */}
      {showModal && (
        <PasswordModal
          password={editingPassword}
          onSave={editingPassword ? handleUpdatePassword : handleAddPassword}
          onClose={closeModal}
          themeClasses={themeClasses}
          error={error}
        />
      )}
    </div>
  );
};

export default Dashboard;