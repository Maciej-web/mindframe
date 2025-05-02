import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectUser, logout } from '../../store/authSlice';

const Header: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Klick außerhalb & ESC-Taste schließen Dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name: string | undefined | null) => {
    return name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <header className="h-[90px] py-6 px-8 bg-white border-b border-gray-100 flex items-center">
      <div className="flex justify-between items-center w-full">
        {/* Titel & Untertitel */}
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Dashboard</h1>
          <p className="text-navy-600 text-sm mt-1 max-w-2xl">
            Nutze unsere Module, um Gedanken zu organisieren, Entscheidungen zu treffen und Ziele zu erreichen
          </p>
        </div>

        {/* Benutzer-Menü */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profil'}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm">
                {getInitials(user?.displayName)}
              </div>
            )}
            <span className="text-navy-700 font-medium hidden sm:block">
              {user?.displayName || 'Benutzer'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-navy-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Mein Profil
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Einstellungen
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Abmelden
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
