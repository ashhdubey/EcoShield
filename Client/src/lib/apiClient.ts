// Save this file in: Client/src/lib/apiClient.ts

import axios from 'axios';

// Create a new instance of axios with a custom configuration
const apiClient = axios.create({
  // Checks for a cloud URL first; falls back to localhost for development
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;