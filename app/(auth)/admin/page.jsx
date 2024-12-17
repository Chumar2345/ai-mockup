// app/(auth)/admin/page.jsx

'use client'; // Add this at the top to mark this as a Client Component

import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you would handle the login logic (e.g., API request to verify admin credentials)
    if (email === 'admin@example.com' && password === 'admin123') {
      // On success, redirect to the admin dashboard (or wherever you need)
      window.location.href = '/admin/dashboard'; // Example redirect
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-16 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
      {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
