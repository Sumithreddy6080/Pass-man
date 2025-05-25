// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Github, LogOut } from 'lucide-react';

const Header = ({ user, isDarkMode, onToggleTheme, onLogout, themeClasses }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUserInitials = () => {
    if (user.userdetails?.username) {
      return user.userdetails?.username.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.username) {
      return user.userdetails?.usernamesubstring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    onLogout();
  };

  return (
    <header className={`border-b ${themeClasses.border} px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <span className="text-xl font-mono">&lt; passMan /&gt;</span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg ${themeClasses.buttonBg} ${themeClasses.hoverBg} transition-colors`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white hover:bg-orange-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              aria-label="Open profile menu"
            >
              {getUserInitials()}
            </button>
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-48 ${themeClasses.modalBg} rounded-lg shadow-lg border ${themeClasses.border} z-50`}>
                <div className="py-2">
                  <div className={`px-4 py-2 ${themeClasses.textSecondary} text-sm border-b ${themeClasses.border}`}>
                    {user?.email || 'user@example.com'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 ${themeClasses.hoverBg} flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors`}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* GitHub Link */}
          <a
            href="https://github.com/Sumithreddy6080/Pass-man"
            target="_blank"
            rel="noopener noreferrer"
            className={`${themeClasses.buttonBg} px-3 py-1 rounded hover:underline text-sm flex items-center space-x-2 ${themeClasses.hoverBg} transition-colors`}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;