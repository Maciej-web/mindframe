import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { MainLayout } from '../../../components/layout/MainLayout';
import { Button } from '../../../components/ui/Button';
import BrainDumpForm from '../components/BrainDumpForm';
import ExportOptions from '../components/ExportOptions';
import { fetchSummary } from '../store/BrainOrganizerSlice';
import BrainOrganizerNav from '../components/BrainOrganizerNav';

const BrainDumpPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentBrainDump, summary, thoughts } = useAppSelector((state) => state.brainOrganizer);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (currentBrainDump && thoughts.length > 0 && !summary) {
      dispatch(fetchSummary(currentBrainDump.id));
    }
  }, [currentBrainDump, thoughts.length, summary, dispatch]);
  
  // Wenn Gedanken und Zusammenfassung da sind, Processing als abgeschlossen markieren
  useEffect(() => {
    if (thoughts.length > 0 && summary) {
      // Verzögerung für Animation
      setTimeout(() => {
        setProcessingComplete(true);
        setShowInput(false); // Ausblenden des Eingabeformulars
      }, 300);
    }
  }, [thoughts.length, summary]);
  
  // Anzeigen des Eingabeformulars für weitere Gedanken
  const handleMoreInput = () => {
    setShowInput(true);
  };
  
  return (
    <MainLayout
      title="Brain Dump"
      subtitle="Erfasse deine Gedanken frei und unstrukturiert"
    >
      <BrainOrganizerNav />
      
      <div className="max-w-4xl mx-auto">
        {/* Anzeigen des Eingabeformulars nur wenn showInput true ist */}
        {showInput && <BrainDumpForm />}
        
        {summary && (
          <div className="animate-fadeIn">
            <div className="p-5 my-5 bg-green-50 border border-green-200 rounded-xl text-center">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-green-800">Gedanken erfolgreich erfasst!</h2>
              <p className="text-green-600 mb-2">Deine Gedanken wurden analysiert und gruppiert.</p>
            </div>
            
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl mb-5">
              <h3 className="text-lg font-semibold mb-2 text-navy-800">Zusammenfassung</h3>
              <p className="text-navy-700">{summary}</p>
            </div>
            
            <div className={`flex justify-center mb-8 gap-4 transform transition-all duration-500 ${processingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                variant="outline" 
                onClick={handleMoreInput}
                className="px-6"
              >
                Mehr Gedanken eingeben
              </Button>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/brain-organizer/clusters')}
                className="px-6"
              >
                Weiter zum Sortieren →
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BrainDumpPage;