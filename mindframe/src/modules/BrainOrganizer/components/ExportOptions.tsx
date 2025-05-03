// src/modules/BrainOrganizer/components/ExportOptions.tsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store'; // Adjust path as needed
import { exportService } from '../services/exportService';

const ExportOptions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBrainDump, clusters, thoughts, summary } = useSelector(
    (state: RootState) => state.brainOrganizer
  );
  
  if (!currentBrainDump) {
    return null;
  }
  
  const handleExportMarkdown = () => {
    exportService.downloadAsMarkdown(currentBrainDump, clusters, thoughts, summary);
    setIsOpen(false);
  };
  
  const handleExportPdf = async () => {
    await exportService.exportAsPdf(currentBrainDump, clusters, thoughts, summary);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Export
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={handleExportMarkdown}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Export as Markdown
            </button>
            <button
              onClick={handleExportPdf}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;