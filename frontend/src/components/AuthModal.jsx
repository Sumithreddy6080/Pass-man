// components/AuthModal.jsx
import React, { useState, useCallback } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const AuthModal = ({ onClose, onSuccess }) => {
  // Form states
  const [signinState, setSigninState] = useState({ email: "", password: "" });
  const [signupState, setSignupState] = useState({ username: "", email: "", password: "" });
  const [mode, setMode] = useState("signin");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation
  const isSigninValid = signinState.email.trim() && signinState.password.trim();
  const isSignupValid = signupState.username.trim() && signupState.email.trim() && signupState.password.trim();
  const isFormValid = mode === "signin" ? isSigninValid : isSignupValid;

  // Handlers
  const handleModeSwitch = useCallback((newMode) => {
    setMode(newMode);
    setError("");
    setShowPassword(false);
  }, []);

  const handleInputChange = useCallback((field, value, isSignup = false) => {
    const setter = isSignup ? setSignupState : setSigninState;
    setter(prev => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error on input change
  }, [error]);

  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = mode === "signin" 
        ? { email: signinState.email, password: signinState.password }
        : { username: signupState.username, email: signupState.email, password: signupState.password };

      const result = await authService.authenticate(mode, payload);
      
      await login(result.token);
      onClose();
      
      if (onSuccess) {
        onSuccess(result.user);
      }
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6">
            <button
              className={`pb-1 border-b-2 transition-colors ${
                mode === "signin" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
              onClick={() => handleModeSwitch("signin")}
              disabled={isSubmitting}
            >
              Sign In
            </button>
            <button
              className={`pb-1 border-b-2 transition-colors ${
                mode === "signup" ? "border-black text-black" : "border-transparent text-gray-500"
              }`}
              onClick={() => handleModeSwitch("signup")}
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-600 hover:text-gray-800 text-xl font-bold p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Username field for signup */}
          {mode === "signup" && (
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                value={signupState.username}
                onChange={(e) => handleInputChange("username", e.target.value, true)}
                disabled={isSubmitting}
                required
              />
            </div>
          )}

          {/* Email field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
              value={mode === "signin" ? signinState.email : signupState.email}
              onChange={(e) => handleInputChange("email", e.target.value, mode === "signup")}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Password field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
              value={mode === "signin" ? signinState.password : signupState.password}
              onChange={(e) => handleInputChange("password", e.target.value, mode === "signup")}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded hover:bg-gray-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleAuth}
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting 
              ? (mode === "signin" ? "Signing In..." : "Signing Up...")
              : (mode === "signin" ? "Sign In" : "Sign Up")
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;