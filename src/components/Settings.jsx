import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Save, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { tmdbService } from '../services/tmdbApi';

export function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const existingKey = tmdbService.getApiKey();
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, []);

  const isEnvKey = !!import.meta.env.VITE_TMDB_API_KEY;

  const handleSave = async () => {
    tmdbService.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Test the API key
    if (apiKey) {
      setTesting(true);
      try {
        const results = await tmdbService.searchMovies('test');
        setTestResult(results.length > 0 && results[0].tmdbId !== 'mock-' ? 'success' : 'error');
      } catch (error) {
        setTestResult('error');
      }
      setTesting(false);
      setTimeout(() => setTestResult(null), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-purple-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Settings
          </h2>
        </div>

        <div className="space-y-6">
          {/* TMDB API Key Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              TMDB API Key
            </label>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-300 mb-2">
                To get real movie data, you need a free TMDB API key:
              </p>
              <ol className="text-sm text-blue-200 space-y-1 ml-4 list-decimal">
                <li>Sign up at <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-100">themoviedb.org</a></li>
                <li>Go to Settings → API → Request API Key (Developer)</li>
                <li>Copy your API Key (v3 auth) and paste it below</li>
              </ol>
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Get API Key
              </a>
            </div>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your TMDB API key..."
              disabled={isEnvKey}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {isEnvKey && (
              <div className="mt-2 text-xs text-purple-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Using API key from environment configuration
              </div>
            )}

            {testResult === 'success' && (
              <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                API key is valid and working!
              </div>
            )}

            {testResult === 'error' && (
              <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                API key appears to be invalid. Please check and try again.
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={testing}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
          >
            {testing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Testing API Key...
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>

          {/* Info */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              <strong className="text-gray-300">Note:</strong> Your API key is stored locally in your browser and never sent to any server except TMDB. Without an API key, the app will use mock data for searches.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
