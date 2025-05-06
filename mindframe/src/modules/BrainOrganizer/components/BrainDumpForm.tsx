import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { submitBrainDump, clusterThoughts } from '../store/BrainOrganizerSlice';

const BrainDumpForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector(state => state.brainOrganizer);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await dispatch(submitBrainDump(content)).unwrap();
      await dispatch(clusterThoughts(result.thoughts)).unwrap();
      setContent('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Failed to process brain dump:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Brain Dump</h2>
      <p className="text-gray-600 mb-4">
        Gib deine Gedanken frei und ohne Struktur ein. Die KI wird dir helfen, sie zu organisieren.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
            placeholder="Gib hier deine Gedanken ein... Schreibe, was dir in den Sinn kommt, in beliebiger Reihenfolge. Mach dir keine Gedanken über die Struktur."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>
        
        <div className="flex justify-end">
          {isSubmitting ? (
            <div className="w-full max-w-sm">
              <div className="animate-pulse bg-gray-200 h-4 my-2 rounded w-full"></div>
              <div className="animate-pulse bg-gray-200 h-4 my-2 rounded w-3/4"></div>
              <div className="animate-pulse bg-gray-200 h-4 my-2 rounded w-1/2"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!content.trim()}
            >
              Gedanken organisieren
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BrainDumpForm;