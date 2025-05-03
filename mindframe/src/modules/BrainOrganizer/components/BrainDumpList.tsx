// src/modules/BrainOrganizer/components/BrainDumpList.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { Thought } from '../types';

const BrainDumpList: React.FC = () => {
  const { thoughts, isLoading, clusters } = useSelector((state: RootState) => state.brainOrganizer);
  
  if (isLoading) {
    return <div className="text-center py-8">Processing your thoughts...</div>;
  }
  
  if (thoughts.length === 0) {
    return null;
  }
  
  // Group thoughts by cluster
  const thoughtsByCluster: Record<string, Thought[]> = {};
  const uncategorizedThoughts: Thought[] = [];
  
  thoughts.forEach((thought: Thought) => {
    if (thought.clusterId) {
      if (!thoughtsByCluster[thought.clusterId]) {
        thoughtsByCluster[thought.clusterId] = [];
      }
      thoughtsByCluster[thought.clusterId]?.push(thought);
    } else {
      uncategorizedThoughts.push(thought);
    }
  });
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Organized Thoughts</h2>
      
      {Object.entries(thoughtsByCluster).map(([clusterId, clusterThoughts]) => {
        const cluster = clusters.find((cluster: { id: string }) => cluster.id === clusterId);
        if (!cluster) return null;
        
        return (
          <div key={clusterId} className="mb-8 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{cluster.name}</h3>
            <p className="text-gray-600 mb-4">{cluster.description}</p>
            
            <ul className="space-y-2">
              {clusterThoughts.map(thought => (
                <li 
                  key={thought.id} 
                  className="p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  {thought.content}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      
      {uncategorizedThoughts.length > 0 && (
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Uncategorized</h3>
          <p className="text-gray-600 mb-4">Thoughts that don't fit into any cluster yet</p>
          
          <ul className="space-y-2">
            {uncategorizedThoughts.map(thought => (
              <li 
                key={thought.id} 
                className="p-3 bg-gray-50 rounded-md hover:bg-gray-100"
              >
                {thought.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrainDumpList;