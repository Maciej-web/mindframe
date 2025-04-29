// src/components/Header.jsx
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-blue-600">MindFrame</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">So funktioniert's</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Preise</a>
          </nav>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Login</a>
            <a 
              href="/signup" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Kostenlos starten
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">So funktioniert's</a>
            <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">Preise</a>
            <a href="/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">Login</a>
            <a href="/signup" className="block px-3 py-3 text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Kostenlos starten</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;