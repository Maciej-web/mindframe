// src/modules/BrainOrganizer/components/DroppableCluster.tsx

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { reassignThought } from '../store/BrainOrganizerSlice';
import DraggableThought from './DraggableThought';
import type { Cluster, Thought } from '../types';
import { useAppDispatch } from '../../../store';

interface DroppableClusterProps {
  cluster: Cluster;
  thoughts: Thought[];
  onEditThought: (thought: Thought) => void;
  onEditCluster: (cluster: Cluster) => void;
}

const DroppableCluster: React.FC<DroppableClusterProps> = ({
  cluster,
  thoughts,
  onEditThought,
  onEditCluster,
}) => {
  const dispatch = useAppDispatch();
  
// src/modules/BrainOrganizer/components/DroppableCluster.tsx (Fortsetzung)
const [{ isOver }, drop] = useDrop(() => ({
    accept: 'THOUGHT',
    drop: (item: { id: string }) => {
      dispatch(reassignThought({ thoughtId: item.id, clusterId: cluster.id }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const dropRef = useRef<HTMLDivElement | null>(null);
drop(dropRef); // bindet drop-Logik an DOM-Ref

  return (
    <div
      ref={dropRef}
      className={`p-4 border border-gray-200 rounded-lg ${
        isOver ? 'bg-blue-50 border-blue-300' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">{cluster.name}</h3>
          <p className="text-gray-600 text-sm">{cluster.description}</p>
        </div>
        <button
          onClick={() => onEditCluster(cluster)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="space-y-3">
        {thoughts.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            Drop thoughts here
          </p>
        ) : (
          thoughts.map((thought) => (
            <DraggableThought
              key={thought.id}
              thought={thought}
              onEdit={onEditThought}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DroppableCluster;