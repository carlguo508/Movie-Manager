import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, List, PlusCircle, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'My List', icon: List },
    { path: '/add', label: 'Add New', icon: PlusCircle },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <Film className="w-6 h-6 text-purple-500" />
            MovieManager
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  location.pathname === item.path
                    ? "bg-white/10 text-white shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
