// services/authService.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const authService = {
  // Authenticate user (login or register)
  async authenticate(mode, payload) {
    const endpoint = mode === 'signin' ? 'login' : 'register';
    const response = await fetch(`${BASE_URL}/api/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return handleResponse(response);
  },

  // Verify token
  async verifyToken(token) {
    const response = await fetch(`${BASE_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return handleResponse(response);
  }
};