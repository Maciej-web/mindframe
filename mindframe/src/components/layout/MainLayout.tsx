import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Hauptlayout-Komponente für die Anwendung
 * Enthält die grundlegende Seitenstruktur mit Header, Sidebar und Content-Bereich
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-primary-600 font-bold text-xl">MindFrame</div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Beispiele für Header-Aktionen */}
            <button className="p-2 text-neutral-500 hover:text-neutral-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 text-neutral-500 hover:text-neutral-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-neutral-200 shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="/" className="block px-4 py-2 rounded-md text-primary-700 bg-primary-50 font-medium">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/brain-organizer" className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50 font-medium">
                  Brain Organizer
                </a>
              </li>
              <li>
                <a href="/decision-wizard" className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50 font-medium">
                  Decision Wizard
                </a>
              </li>
              <li>
                <a href="/focus-mapper" className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50 font-medium">
                  Focus Mapper
                </a>
              </li>
              <li>
                <a href="/reflection-log" className="block px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-50 font-medium">
                  Reflexionslogbuch
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;