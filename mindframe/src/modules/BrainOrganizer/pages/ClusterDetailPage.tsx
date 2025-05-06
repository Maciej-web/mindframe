// src/modules/BrainOrganizer/pages/ClusterDetailPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { MainLayout } from '../../../components/layout/MainLayout';
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import { Button } from '../../../components/ui/Button';
import { renameCluster, reassignThought, updateThought, deleteCluster } from '../store/BrainOrganizerSlice';
import { Pencil } from 'lucide-react';
import type { Cluster, Thought } from '../types';

const ClusterDetailPage: React.FC = () => {
  const { clusterId } = useParams<{ clusterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { clusters, thoughts } = useAppSelector((state) => state.brainOrganizer);
  const cluster = clusters.find((c: Cluster) => c.id === clusterId);
  const clusterThoughts = thoughts.filter((t: Thought) => t.clusterId === clusterId);
  
  const [editingThoughtId, setEditingThoughtId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isEditingCluster, setIsEditingCluster] = useState(false);
  const [newClusterName, setNewClusterName] = useState('');
  
  if (!cluster) {
    return (
      <MainLayout title="Cluster nicht gefunden" subtitle="">
        <BrainOrganizerNav />
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Cluster nicht gefunden</p>
          <Button
            onClick={() => navigate('/brain-organizer/results')}
          >
            Zurück zur Übersicht
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const handleThoughtEdit = (thought: any) => {
    setEditingThoughtId(thought.id);
    setEditingContent(thought.content);
  };
  
  const saveThoughtEdit = async () => {
    if (!editingThoughtId || !editingContent.trim()) {
      setEditingThoughtId(null);
      return;
    }
    
    const thought = thoughts.find((t: Thought) => t.id === editingThoughtId);
    if (!thought) return;
    
    const updatedThought = {
      ...thought,
      content: editingContent.trim(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(updateThought(updatedThought));
    setEditingThoughtId(null);
  };
  
  const handleClusterNameEdit = () => {
    setIsEditingCluster(true);
    setNewClusterName(cluster.name);
  };
  
  const saveClusterName = async () => {
    if (!newClusterName.trim() || newClusterName === cluster.name) {
      setIsEditingCluster(false);
      return;
    }
    
    try {
      await dispatch(renameCluster({ clusterId: cluster.id, name: newClusterName.trim() }));
      setIsEditingCluster(false);
    } catch (error) {
      console.error('Failed to rename cluster:', error);
    }
  };
  
  const handleMoveThought = async (thoughtId: string, targetClusterId: string | null) => {
    try {
      await dispatch(reassignThought({ thoughtId, clusterId: targetClusterId || '' }));
    } catch (error) {
      console.error('Failed to move thought:', error);
    }
  };
  
  const handleDeleteCluster = async () => {
    if (window.confirm(`Möchtest du das Cluster "${cluster.name}" wirklich löschen? Alle Gedanken werden in "Nicht kategorisiert" verschoben.`)) {
      try {
        await dispatch(deleteCluster(cluster.id));
        navigate('/brain-organizer/results');
      } catch (error) {
        console.error('Failed to delete cluster:', error);
      }
    }
  };

  // Statt komplettem Löschen verschieben wir nach "Nicht kategorisiert"
  const handleRemoveThought = (thoughtId: string) => {
    if (window.confirm('Möchtest du diesen Gedanken aus dem Cluster entfernen?')) {
      dispatch(reassignThought({ thoughtId, clusterId: '' }));
    }
  };
  
  return (
    <MainLayout
      title={isEditingCluster ? "Cluster bearbeiten" : cluster.name}
      subtitle={cluster.description}
    >
      <BrainOrganizerNav />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          {isEditingCluster ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={newClusterName}
                onChange={(e) => setNewClusterName(e.target.value)}
                autoFocus
              />
              <Button onClick={saveClusterName}>
                Speichern
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditingCluster(false)}
              >
                Abbrechen
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/brain-organizer/results')}
                className="text-primary border-primary"
              >
                ← Zurück zur Übersicht
              </Button>
              <Button
                variant="outline"
                onClick={handleClusterNameEdit}
                className="text-primary border-primary"
              >
                Bearbeiten
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteCluster}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Löschen
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-navy-800 mb-4">
            Gedanken in diesem Cluster
          </h2>
          
          {clusterThoughts.length === 0 ? (
            <p className="text-gray-500 p-8 text-center border border-gray-200 rounded-lg bg-gray-50">
              Keine Gedanken in diesem Cluster vorhanden.
            </p>
          ) : (
            <ul className="space-y-4">
              {clusterThoughts.map((thought: Thought) => (
                <li key={thought.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 group relative">
                  {editingThoughtId === thought.id ? (
                    <div>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        autoFocus
                      />
                      <div className="flex justify-end mt-3 gap-3">
                        <Button
                          onClick={saveThoughtEdit}
                        >
                          Speichern
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingThoughtId(null)}
                        >
                          Abbrechen
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="pr-8">{thought.content}</p>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleThoughtEdit(thought)}
                          className="text-primary hover:text-primary-dark"
                          title="Bearbeiten"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-end mt-3 gap-3">
                        <select
                          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleMoveThought(thought.id, e.target.value === 'uncategorized' ? null : e.target.value);
                            }
                            e.target.value = '';
                          }}
                        >
                          <option value="" disabled>Verschieben nach...</option>
                          <option value="uncategorized">Nicht kategorisiert</option>
                          {clusters
                            .filter((c: Cluster) => c.id !== clusterId)
                            .map((c: Cluster) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleRemoveThought(thought.id)}
                        >
                          Entfernen
                        </Button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClusterDetailPage;