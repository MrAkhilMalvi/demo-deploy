'use client';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');

    // Use the environment variable here
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setStatus('Saved successfully! 🎉');
        setMessage('');
      } else {
        setStatus('Failed to save.');
      }
    } catch (error) {
      setStatus(`Error connecting to backend at ${API_URL}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Save Your Message
        </h1>
        <p className="text-gray-500 mb-6 text-center text-sm">
          Type a message below to send it to the Node.js database.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g., Hello World!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-black border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
          >
            Submit to Database
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center text-sm font-medium text-gray-700">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}