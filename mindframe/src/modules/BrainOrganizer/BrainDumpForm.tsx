import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { saveBrainDump, selectBrainOrganizerStatus, selectBrainOrganizerError, clearBrainOrganizerError } from '../../store/brainOrganizerSlice';
import { selectIsAuthenticated } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const BrainDumpForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Auth & State Selektoren
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectBrainOrganizerStatus);
  const error = useAppSelector(selectBrainOrganizerError);
  const isLoading = status === 'loading';

  // Redirect falls nicht eingeloggt
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: '/brain-organizer', message: 'Please log in to create brain dumps' } 
      });
    }
  }, [isAuthenticated, navigate]);

  // Reset Fehler wenn die Komponente unmountet
  useEffect(() => {
    return () => {
      dispatch(clearBrainOrganizerError());
    };
  }, [dispatch]);

  // Beobachte Status-Änderungen für Erfolg/Fehler Handling
  useEffect(() => {
    if (isSubmitting) {
      if (status === 'succeeded') {
        // Erfolg - Form zurücksetzen
        setContent('');
        setTags('');
        setIsSubmitting(false);
      } else if (status === 'failed') {
        // Fehler - Submitting-State zurücksetzen
        setIsSubmitting(false);
      }
    }
  }, [status, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isLoading) return;
    
    // Tags aus Komma-separiertem String in Array umwandeln
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    setIsSubmitting(true);
    
    // Brain Dump speichern mit dem Thunk
    await dispatch(saveBrainDump({
      content,
      tags: tagArray,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">New Brain Dump</h2>
      
      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 right-0 p-2"
            onClick={() => dispatch(clearBrainOrganizerError())}
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Success Alert */}
      {status === 'succeeded' && isSubmitting === false && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Your brain dump was saved.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            What's on your mind?
          </label>
          <textarea
            id="content"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type anything that's on your mind..."
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, idea, followup"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={isLoading || !content.trim()}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save Brain Dump'
          )}
        </button>
      </form>
    </div>
  );
};

export default BrainDumpForm;