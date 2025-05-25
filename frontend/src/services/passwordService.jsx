// services/passwordService.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const passwordService = {
  // Get all passwords
  async getPasswords() {
    const response = await fetch(`${BASE_URL}/api/user/data`, {
      headers: getAuthHeaders()
    });
    const data = await handleResponse(response);
    return data.data;
  },

  // Add new password
  async addPassword(passwordData) {
    const response = await fetch(`${BASE_URL}/api/user/data`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });
    const data = await handleResponse(response);
    return data.data;
  },

  // Update password
  async updatePassword(id, passwordData) {
    const response = await fetch(`${BASE_URL}/api/user/data`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, ...passwordData })
    });
    const data = await handleResponse(response);
    return data.data;
  },

  // Delete password
  async deletePassword(id) {
    const response = await fetch(`${BASE_URL}/api/user/data`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id })
    });
    await handleResponse(response);
    return true;
  }
};