import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BrainOrganizerNav: React.FC = () => {
  const location = useLocation();
  
  // Bestimme den aktuellen Reiter basierend auf dem Pfad
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/brain-organizer/results')) return 'results';
    if (path.includes('/brain-organizer/clusters')) return 'clusters';
    return 'input';
  };
  
  const activeTab = getActiveTab();

  return (
    <div className="w-full bg-white border-b border-gray-200 mb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center h-auto sm:h-16 px-4 py-3 sm:py-0">
          <div className="font-bold text-xl text-navy-800 mb-4 sm:mb-0">Brain Organizer</div>
          
          <div className="w-full sm:w-auto flex justify-center space-x-1 sm:ml-auto">
            <div className="grid grid-cols-3 w-full sm:w-auto gap-1 bg-gray-100 p-1 rounded-lg">
              <NavLink
                to="/brain-organizer"
                className={`
                  px-4 py-2 rounded-md text-center transition-all duration-200 font-medium text-sm
                  ${activeTab === 'input'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}
                `}
              >
                1. Eingabe
              </NavLink>
              
              <NavLink
                to="/brain-organizer/clusters"
                className={`
                  px-4 py-2 rounded-md text-center transition-all duration-200 font-medium text-sm
                  ${activeTab === 'clusters'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}
                `}
              >
                2. Sortieren
              </NavLink>
              
              <NavLink
                to="/brain-organizer/results"
                className={`
                  px-4 py-2 rounded-md text-center transition-all duration-200 font-medium text-sm
                  ${activeTab === 'results'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}
                `}
              >
                3. Ergebnis
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainOrganizerNav;