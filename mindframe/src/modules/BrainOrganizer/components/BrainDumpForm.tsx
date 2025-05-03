// src/modules/BrainOrganizer/components/BrainDumpForm.tsx

import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { submitBrainDump, clusterThoughts } from '../store/BrainOrganizerSlice';

const BrainDumpForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await dispatch(submitBrainDump(content)).unwrap();
      await dispatch(clusterThoughts(result.thoughts)).unwrap();
      setContent('');
    } catch (error) {
      console.error('Failed to process brain dump:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Brain Dump</h2>
      <p className="text-gray-600 mb-4">
        Enter your thoughts freely in any order. The AI will help organize them.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your thoughts here... Write anything that comes to mind, in any order. Don't worry about structure."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? 'Processing...' : 'Organize My Thoughts'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrainDumpForm;