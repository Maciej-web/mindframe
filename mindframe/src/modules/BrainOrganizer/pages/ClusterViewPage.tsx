import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector, useAppDispatch } from '../../../store';
import { MainLayout } from '../../../components/layout/MainLayout';
import { Button } from '../../../components/ui/Button';
import DroppableCluster from '../components/DroppableCluster';
import UncategorizedDropZone from '../components/UncategorizedDropZone';
import IllustrationEmpty from '../../../components/illustrations/EmptyState';
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import { createCluster, renameCluster, updateThought } from '../store/BrainOrganizerSlice';
import type { Cluster, Thought } from '../types';
import { Pencil } from "lucide-react";

const ClusterViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { clusters, thoughts } = useAppSelector((state) => state.brainOrganizer);
  const [newClusterName, setNewClusterName] = useState('');
  const [editingThought, setEditingThought] = useState<Thought | null>(null);
  const [editingCluster, setEditingCluster] = useState<Cluster | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingClusterName, setEditingClusterName] = useState('');
  const dispatch = useAppDispatch();
  
  const handleCreateCluster = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClusterName.trim()) return;
    
    try {
      await dispatch(createCluster(newClusterName.trim())).unwrap();
      setNewClusterName('');
    } catch (error) {
      console.error('Failed to create cluster:', error);
    }
  };
  
  const handleEditThought = (thought: Thought) => {
    setEditingThought(thought);
    setEditingContent(thought.content);
  };
  
  const handleSaveThought = async () => {
    if (!editingThought || !editingContent.trim()) {
      setEditingThought(null);
      return;
    }
    
    const updatedThought = {
      ...editingThought,
      content: editingContent.trim(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(updateThought(updatedThought));
    setEditingThought(null);
  };
  
  const handleEditCluster = (cluster: Cluster) => {
    setEditingCluster(cluster);
    setEditingClusterName(cluster.name);
  };
  
  const handleSaveCluster = async () => {
    if (!editingCluster || !editingClusterName.trim() || editingClusterName === editingCluster.name) {
      setEditingCluster(null);
      return;
    }
    
    try {
      await dispatch(renameCluster({
        clusterId: editingCluster.id,
        name: editingClusterName.trim(),
      })).unwrap();
      setEditingCluster(null);
    } catch (error) {
      console.error('Failed to rename cluster:', error);
    }
  };
  
  // Group thoughts by cluster
  const thoughtsByCluster = clusters.reduce((acc: Record<string, Thought[]>, cluster: Cluster) => {
    acc[cluster.id] = thoughts.filter((t: Thought) => t.clusterId === cluster.id);
    return acc;
  }, {} as Record<string, Thought[]>);
  // Get uncategorized thoughts
  const uncategorizedThoughts = thoughts.filter((thought: Thought) => !thought.clusterId);

  return (
    <MainLayout
      title="Cluster-Ansicht"
      subtitle="Organisiere deine Gedanken in thematische Gruppen"
    >
      <BrainOrganizerNav />
      
      <DndProvider backend={HTML5Backend}>
        <div className="max-w-7xl mx-auto">
          {/* Navigation buttons */}
          <div className="flex justify-between mb-5">
            <Button 
              variant="outline"
              onClick={() => navigate('/brain-organizer')}
            >
              ← Zurück zur Eingabe
            </Button>
            
            {thoughts.length > 0 && clusters.length > 0 && (
              <Button 
                variant="primary"
                onClick={() => navigate('/brain-organizer/results')}
              >
                Weiter zum Ergebnis →
              </Button>
            )}
          </div>

          {/* Create new cluster form */}
          {thoughts.length > 0 && (
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-navy-800 mb-3">Neues Cluster erstellen</h2>
              <form onSubmit={handleCreateCluster} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Cluster-Name eingeben..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newClusterName}
                  onChange={(e) => setNewClusterName(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={!newClusterName.trim()}
                >
                  Erstellen
                </Button>
              </form>
            </div>
          )}

          {/* Clusters and uncategorized section */}
          {thoughts.length > 0 ? (
            <div className="grid gap-5">
              {/* Uncategorized thoughts */}
              {uncategorizedThoughts.length > 0 && (
                <UncategorizedDropZone
                  thoughts={uncategorizedThoughts}
                  onEditThought={handleEditThought}
                />
              )}

              {/* Cluster list */}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {clusters.map((cluster: Cluster) => (
                  <DroppableCluster
                        key={cluster.id}
                        cluster={cluster}
                        thoughts={thoughtsByCluster[cluster.id] || []}
                        onEditThought={handleEditThought}
                        onEditCluster={handleEditCluster} 
                        onDeleteThought={function (thoughtId: string): void {
                            throw new Error('Function not implemented.');
                        } }                  />
                ))}
              </div>
            </div>
          ) : (
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
          )}
        </div>

        {/* Edit thought modal */}
        {editingThought && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-5 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-navy-800">Gedanken bearbeiten</h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none mb-4"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                rows={4}
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setEditingThought(null)}
                >
                  Abbrechen
                </Button>
                <Button onClick={handleSaveThought}>
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit cluster modal */}
        {editingCluster && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-5 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-navy-800">Cluster bearbeiten</h2>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none mb-4"
                value={editingClusterName}
                onChange={(e) => setEditingClusterName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setEditingCluster(null)}
                >
                  Abbrechen
                </Button>
                <Button onClick={handleSaveCluster}>
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        )}
      </DndProvider>
    </MainLayout>
  );
};

export default ClusterViewPage;