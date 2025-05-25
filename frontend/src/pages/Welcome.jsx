// pages/Welcome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import { useTheme } from "../hooks/useTheme";

const Header = ({ themeClasses }) => {
  return (
    <header className="flex items-center mx-[8%] justify-between py-4">
      <div className="md:text-3xl text-2xl text-left font-mono font-bold">
        &lt;Pass Man /&gt;
      </div>
      <a
        href="https://github.com/Sumithreddy6080/Pass-man"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-black px-4 py-2 hover:bg-gray-800 rounded text-sm cursor-pointer font-mono transition-colors"
      >
        GitHub
      </a>
    </header>
  );
};

const HeroSection = ({ onGetStarted, themeClasses }) => {
  return (
    <section className="w-screen  h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl max-sm:text-3xl mb-4 text-center font-bold">
        Welcome to <span className="text-blue-600">Pass-Man</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-8 text-center max-w-2xl">
        A simple and secure password manager to store your passwords safely.
        Never forget a password again.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGetStarted}
          className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-md transition-all transform hover:scale-105 font-medium"
        >
          Get Started
        </button>
        <a
          href="#features"
          className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-md transition-all font-medium text-center"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Secure Storage",
      description: "Your passwords are encrypted and stored securely",
      icon: "🔒"
    },
    {
      title: "Easy Access",
      description: "Access your passwords from anywhere, anytime",
      icon: "🚀"
    },
    {
      title: "Simple Interface",
      description: "Clean and intuitive design for better user experience",
      icon: "✨"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pass-Man?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Welcome = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { themeClasses } = useTheme();

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleAuthSuccess = (user) => {
    console.log("Logged in as:", user);
    setShowModal(false);
    navigate("/dashboard");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header themeClasses={themeClasses} />
      
      <main className="flex-1">
        <HeroSection 
          onGetStarted={handleGetStarted} 
          themeClasses={themeClasses} 
        />
        <FeaturesSection />
      </main>

      <Footer themeClasses={themeClasses} />

      {/* Auth Modal */}
      {showModal && (
        <AuthModal
          onClose={handleCloseModal}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Welcome;