// src/modules/BrainOrganizer/pages/BrainDumpPage.tsx (Update)

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store'; // Adjust path as needed
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import BrainDumpForm from '../components/BrainDumpForm';
import BrainDumpList from '../components/BrainDumpList';
import ExportOptions from '../components/ExportOptions';
import { fetchSummary } from '../store/BrainOrganizerSlice';
import { useAppDispatch } from '../../../store';

const BrainDumpPage: React.FC = () => {
  const { currentBrainDump, summary, thoughts } = useSelector((state: RootState) => state.brainOrganizer);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (currentBrainDump && thoughts.length > 0 && !summary) {
      dispatch(fetchSummary(currentBrainDump.id));
    }
  }, [currentBrainDump, thoughts.length, summary, dispatch]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrainOrganizerNav />
      
      <main className="container mx-auto py-6 px-4">
        <BrainDumpForm />
        
        {thoughts.length > 0 && (
          <div className="w-full max-w-4xl mx-auto flex justify-end mb-4">
            <ExportOptions />
          </div>
        )}
        
        {summary && (
          <div className="w-full max-w-4xl mx-auto p-4 my-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
        
        <BrainDumpList />
      </main>
    </div>
  );
};

export default BrainDumpPage;