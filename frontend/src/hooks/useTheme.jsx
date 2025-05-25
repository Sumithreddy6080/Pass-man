// hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
<p className='bg-black/95'></p>
  const themeClasses = {
    // Background colors
    bg: isDarkMode ? 'bg-black' : 'bg-white',
    cardBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    modalBg: isDarkMode ? 'bg-gray-600' : 'bg-white',
    buttonBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    inputBg: isDarkMode ? 'bg-gray-600' : 'bg-gray-100',
    
    // Text colors
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    
    // Border colors
    border: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    
    // Hover effects
    hoverBg: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    
    // Focus effects
    focusBorder: 'focus:border-blue-500',
    focusRing: 'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
  };

  return {
    isDarkMode,
    toggleTheme,
    themeClasses
  };
};