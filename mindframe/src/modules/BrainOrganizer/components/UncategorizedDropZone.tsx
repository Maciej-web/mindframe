import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../store';
import type { Thought } from '../types';
import { reassignThought } from '../store/BrainOrganizerSlice';
import DraggableThought from './DraggableThought';
import { GripVertical, Inbox } from "lucide-react";

interface UncategorizedDropZoneProps {
  thoughts: Thought[];
  onEditThought: (thought: Thought) => void;
}

const UncategorizedDropZone: React.FC<UncategorizedDropZoneProps> = ({
  thoughts,
  onEditThought,
}) => {
  const dispatch = useAppDispatch();
  
  const [{ isOver }, drop] = useDrop({
    accept: 'THOUGHT',
    drop: (item: { id: string }) => {
      console.log(`Dropping thought ${item.id} into uncategorized`);
      dispatch(reassignThought({ 
        thoughtId: item.id, 
        clusterId: '' 
      }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={node => {
        drop(node)
      }}
      className={`
        border-2 border-dashed rounded-lg group relative transition-all
        ${isOver 
          ? 'border-gray-500 bg-gray-100 shadow-lg' 
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }
      `}
    >
      <div className="h-1 bg-gray-300 rounded-t-lg" />
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="mr-3">
            <Inbox className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-navy-800 pt-2">Nicht kategorisiert</h3>
        </div>
        
        {/* Karten-Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {thoughts.length === 0 ? (
            <p className="text-center py-8 text-gray-400 italic col-span-full">
              Ziehe Gedanken hierher, um sie zu dekategorisieren
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
    </div>
  );
};

export default UncategorizedDropZone;