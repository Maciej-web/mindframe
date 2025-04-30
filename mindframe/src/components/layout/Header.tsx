import React from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "Dashboard", 
  subtitle = "Nutze unsere Module, um Gedanken zu organisieren, Entscheidungen zu treffen und Ziele zu erreichen"
}) => {
  // Anzeigelogik für den Nutzer im Header (Beispiel)
  const user = {
    name: 'Max Mustermann',
    profileImage: null,
  };

  return (
    <header className="h-[90px] py-6 px-8 bg-white border-b border-gray-100 flex items-center"> {/* Höhe von 73px auf 90px erhöht */}
      <div className="flex justify-between items-center w-full">
        {/* Linke Seite: Titel und Untertitel */}
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">{title}</h1>
          {subtitle && (
            <p className="text-navy-600 text-sm mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Rechte Seite: Aktionen und Benutzermenü */}
        <div className="flex items-center space-x-4">
          {/* Benachrichtigungen */}
          <button className="p-2 text-navy-600 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Suche */}
          <button className="p-2 text-navy-600 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Benutzer-Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-3 focus:outline-none">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm"> {/* Größer: h-8 w-8 -> h-10 w-10 */}
                  {user.name.split(' ').map(name => name[0]).join('')}
                </div>
              )}
              <span className="text-navy-700 font-medium hidden sm:block">{user.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;