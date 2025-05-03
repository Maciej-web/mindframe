// src/modules/BrainOrganizer/pages/ClusterViewPage.tsx (mit Drag & Drop)

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { RootState } from '../../../store';
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import DroppableCluster from '../components/DroppableCluster';
import { createCluster, renameCluster, updateThought } from '../store/BrainOrganizerSlice';
import type { Cluster, Thought } from '../types';
import { useAppDispatch } from '../../../store';

const ClusterViewPage: React.FC = () => {
  const { clusters, thoughts } = useSelector((state: RootState) => state.brainOrganizer);
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
  
  // Group thoughts by cluster for display
  const thoughtsByCluster = clusters.reduce(
    (acc: Record<string, Thought[]>, cluster: Cluster) => {
      acc[cluster.id] = thoughts.filter((t: Thought) => t.clusterId === cluster.id);
      return acc;
    },
    {} as Record<string, Thought[]>
  );
  
  // Get uncategorized thoughts
  const uncategorizedThoughts = thoughts.filter((thought: Thought) => !thought.clusterId);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrainOrganizerNav />
      
      <main className="container mx-auto py-6 px-4">
        <div className="w-full max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-4">Thought Clusters</h1>
          
          <form onSubmit={handleCreateCluster} className="mb-8 flex">
            <input
              type="text"
              placeholder="Create a new cluster..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newClusterName}
              onChange={(e) => setNewClusterName(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!newClusterName.trim()}
            >
              Create
            </button>
          </form>
          
          {/* Modal for editing thought */}
          {editingThought && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Thought</h2>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={4}
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingThought(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveThought}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Modal for editing cluster */}
          {editingCluster && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Cluster</h2>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
                  value={editingClusterName}
                  onChange={(e) => setEditingClusterName(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingCluster(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCluster}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <DndProvider backend={HTML5Backend}>
            <div className="space-y-6">
              {/* Uncategorized thoughts */}
              {uncategorizedThoughts.length > 0 && (
                <div className="p-4 border border-gray-200 rounded-lg bg-white">
                  <h3 className="text-xl font-semibold mb-4">Uncategorized</h3>
                  <div className="space-y-3">
                    {uncategorizedThoughts.map((thought: Thought) => (
                      <div
                        key={thought.id}
                        className="p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                      >
                        <p>{thought.content}</p>
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleEditThought(thought)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Clusters */}
              {clusters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No clusters yet. Create your first cluster or submit a brain dump to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {clusters.map((cluster: Cluster) => (
                    <DroppableCluster
                      key={cluster.id}
                      cluster={cluster}
                      thoughts={thoughtsByCluster[cluster.id] || []}
                      onEditThought={handleEditThought}
                      onEditCluster={handleEditCluster}
                    />
                  ))}
                </div>
              )}
            </div>
          </DndProvider>
        </div>
      </main>
    </div>
  );
};

export default ClusterViewPage;