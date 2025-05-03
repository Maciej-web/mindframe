// src/modules/BrainOrganizer/components/ClusterCard.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import type { Cluster, Thought } from '../types';
import { renameCluster, deleteCluster } from '../store/BrainOrganizerSlice';

interface ClusterCardProps {
  cluster: Cluster;
  thoughts: Thought[];
}

const ClusterCard: React.FC<ClusterCardProps> = ({ cluster, thoughts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(cluster.name);
  const dispatch = useAppDispatch();
  
  const handleRename = async () => {
    if (newName.trim() && newName !== cluster.name) {
      try {
        await dispatch(renameCluster({ clusterId: cluster.id, name: newName.trim() })).unwrap();
      } catch (error) {
        console.error('Failed to rename cluster:', error);
      }
    }
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the "${cluster.name}" cluster? Thoughts will be moved to uncategorized.`)) {
      try {
        await dispatch(deleteCluster(cluster.id)).unwrap();
      } catch (error) {
        console.error('Failed to delete cluster:', error);
      }
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gray-50 p-4">
        {isEditing ? (
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleRename}
              className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{cluster.name}</h3>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="mr-2 text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        <p className="text-gray-600 mt-1">{cluster.description}</p>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500">{thoughts.length} thoughts</p>
        
        <ul className="mt-3 space-y-2">
          {thoughts.slice(0, 3).map(thought => (
            <li key={thought.id} className="text-sm truncate">{thought.content}</li>
          ))}
        </ul>
        
        {thoughts.length > 3 && (
          <p className="mt-2 text-sm text-gray-500">
            And {thoughts.length - 3} more thoughts...
          </p>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 border-t border-gray-200">
        <Link
          to={`/brain-organizer/clusters/${cluster.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ClusterCard;