// src/modules/BrainOrganizer/components/BrainOrganizerNav.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const BrainOrganizerNav: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Brain Organizer</span>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/brain-organizer"
                className={({ isActive }: { isActive: boolean }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } text-sm font-medium`
                }
              >
                New Brain Dump
              </NavLink>
              
              <NavLink
                to="/brain-organizer/clusters"
                className={({ isActive }: { isActive: boolean }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } text-sm font-medium`
                }
              >
                Clusters
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrainOrganizerNav;