// src/modules/BrainOrganizer/components/DraggableThought.tsx

import React from 'react';
import { useDrag } from 'react-dnd';
import type { Thought } from '../types';
import type { DragSourceMonitor } from 'react-dnd';

interface DraggableThoughtProps {
  thought: Thought;
  onEdit: (thought: Thought) => void;
}

const DraggableThought: React.FC<DraggableThoughtProps> = ({ thought, onEdit }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'THOUGHT',
    item: { id: thought.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  return (
    <div
      ref={drag as any}
      className={`p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p>{thought.content}</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => onEdit(thought)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DraggableThought;