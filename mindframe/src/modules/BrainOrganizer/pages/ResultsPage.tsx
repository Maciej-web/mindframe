import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { MainLayout } from '../../../components/layout/MainLayout';
import { Button } from '../../../components/ui/Button';
import ClusterSummaryList from '../components/ClusterSummaryList';
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import IllustrationEmpty from '../../../components/illustrations/EmptyState';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { clusters, thoughts } = useAppSelector((state) => state.brainOrganizer);
  
  // Prüfen, ob es Gedanken gibt
  const hasContent = thoughts.length > 0;
  // Prüfen, ob es Cluster gibt
  const hasClusters = clusters.length > 0;

  return (
    <MainLayout
      title="Deine organisierten Gedanken"
      subtitle="Übersicht deiner strukturierten Gedanken und Cluster"
    >
      <BrainOrganizerNav />
      
      <div className="max-w-4xl mx-auto">
        {!hasContent ? (
          <div className="flex flex-col items-center py-12">
            <IllustrationEmpty />
            <p className="mt-4 text-gray-600">Noch keine Gedanken vorhanden</p>
            <Button 
              className="mt-4"
              onClick={() => navigate('/brain-organizer')}
            >
              Brain Dump starten
            </Button>
          </div>
        ) : !hasClusters ? (
          <div className="flex flex-col items-center py-12">
            <p className="text-gray-600">Deine Gedanken wurden noch nicht in Cluster sortiert</p>
            <Button 
              className="mt-4"
              onClick={() => navigate('/brain-organizer/clusters')}
            >
              Zum Sortieren
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-navy-700">
                Deine Gedanken wurden erfolgreich organisiert! Hier siehst du eine Übersicht aller Cluster.
                Klicke auf ein Cluster, um die Details anzusehen oder Gedanken zu bearbeiten.
              </p>
            </div>
            
            <ClusterSummaryList />
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline"
                onClick={() => navigate('/brain-organizer/clusters')}
              >
                ← Zurück zum Sortieren
              </Button>
              
              <Button 
                onClick={() => navigate('/brain-organizer')}
              >
                Neuen Brain Dump starten
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ResultsPage;