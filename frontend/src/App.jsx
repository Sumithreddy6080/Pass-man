// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';


const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return isAuthenticated ? <Dashboard /> : <Welcome />;
};


// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
        <AppContent />
        } 
      />
    
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;