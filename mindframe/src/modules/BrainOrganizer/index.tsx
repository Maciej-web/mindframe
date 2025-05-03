// src/modules/BrainOrganizer/index.tsx

import React from 'react';
import { BrainOrganizerRoutes } from './routes';
import brainOrganizerReducer from './store/BrainOrganizerSlice';

// Export for module integration
export { BrainOrganizerRoutes, brainOrganizerReducer };

// Main component
const BrainOrganizer: React.FC = () => {
  return <BrainOrganizerRoutes />;
};

export default BrainOrganizer;