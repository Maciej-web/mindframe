// src/modules/BrainOrganizer/pages/ClusterDetailPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import BrainOrganizerNav from '../components/BrainOrganizerNav';
import { renameCluster, reassignThought, updateThought, deleteCluster } from '../store/BrainOrganizerSlice';
import { useAppDispatch } from '../../../store';
import type { Cluster, Thought } from '../types';

const ClusterDetailPage: React.FC = () => {
  const { clusterId } = useParams<{ clusterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { clusters, thoughts } = useSelector((state: RootState) => state.brainOrganizer);
  const cluster = clusters.find((c: Cluster) => c.id === clusterId);
  const clusterThoughts = thoughts.filter((t: Thought) => t.clusterId === clusterId);
  
  const [editingThoughtId, setEditingThoughtId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isEditingCluster, setIsEditingCluster] = useState(false);
  const [newClusterName, setNewClusterName] = useState('');
  
  if (!cluster) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrainOrganizerNav />
        <main className="container mx-auto py-6 px-4 text-center">
          <p className="text-red-600">Cluster not found</p>
          <button
            onClick={() => navigate('/brain-organizer/clusters')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Clusters
          </button>
        </main>
      </div>
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
    if (window.confirm(`Are you sure you want to delete the "${cluster.name}" cluster? Thoughts will be moved to uncategorized.`)) {
      try {
        await dispatch(deleteCluster(cluster.id));
        navigate('/brain-organizer/clusters');
      } catch (error) {
        console.error('Failed to delete cluster:', error);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrainOrganizerNav />
      
      <main className="container mx-auto py-6 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              {isEditingCluster ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newClusterName}
                    onChange={(e) => setNewClusterName(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={saveClusterName}
                    className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingCluster(false)}
                    className="ml-2 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h1 className="text-3xl font-bold">{cluster.name}</h1>
              )}
              <p className="text-gray-600 mt-1">{cluster.description}</p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleClusterNameEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Edit Name
              </button>
              <button
                onClick={handleDeleteCluster}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Cluster
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Thoughts in this Cluster</h2>
            
            {clusterThoughts.length === 0 ? (
              <p className="text-gray-500">No thoughts in this cluster yet.</p>
            ) : (
              <ul className="space-y-4">
                {clusterThoughts.map((thought: Thought) => (
                  <li key={thought.id} className="p-4 bg-white rounded-lg shadow-sm">
                    {editingThoughtId === thought.id ? (
                      <div>
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          rows={3}
                          autoFocus
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            onClick={saveThoughtEdit}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingThoughtId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>{thought.content}</p>
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            onClick={() => handleThoughtEdit(thought)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <div className="relative inline-block text-left">
                            <select
                              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none focus:outline-none focus:ring-0"
                              value=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleMoveThought(thought.id, e.target.value === 'uncategorized' ? null : e.target.value);
                                }
                                e.target.value = '';
                              }}
                            >
                              <option value="" disabled>Move to...</option>
                              <option value="uncategorized">Uncategorized</option>
                              {clusters
                                .filter((c: Cluster) => c.id !== clusterId)
                                .map((c: Cluster) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/brain-organizer/clusters')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back to All Clusters
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClusterDetailPage;