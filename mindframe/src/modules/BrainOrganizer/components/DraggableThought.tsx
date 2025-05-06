// src/modules/BrainOrganizer/components/DraggableThought.tsx
import React from 'react'
import { useDrag } from 'react-dnd'
import type { Thought } from '../types'
import type { DragSourceMonitor } from 'react-dnd'
import { Pencil, Trash2, FolderX } from 'lucide-react'

interface DraggableThoughtProps {
  thought: Thought
  onEdit: (thought: Thought) => void
  onDelete: (thoughtId: string) => void
  onMoveToUncategorized?: (thoughtId: string) => void
  editable?: boolean
  inCluster?: boolean
}

const DraggableThought: React.FC<DraggableThoughtProps> = ({
  thought,
  onEdit,
  onDelete,
  onMoveToUncategorized,
  editable = true,
  inCluster = false,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'THOUGHT',
    item: { id: thought.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag as any}
      className={`
        p-4 bg-white rounded-md border border-gray-200 shadow-sm 
        hover:shadow-md transition-all duration-200 cursor-move group relative
        ${isDragging ? 'opacity-50 rotate-1' : 'opacity-100'}
      `}
    >
      {/* Text mit korrektem Padding, damit er nicht beschnitten wird */}
      <div className="pr-6">
        <p className="text-gray-700 text-sm break-words">{thought.content}</p>
      </div>

      {/* Absolute positionierte Icons in der oberen rechten Ecke */}
      <div className="absolute top-3 right-3">
        {editable && (
          <button
            onClick={() => onEdit(thought)}
            className="text-primary hover:text-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"
            title="Bearbeiten"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}

        {inCluster ? (
          // In Clustern: Verschiebe nach "Nicht kategorisiert"
          <button
            onClick={() => onDelete(thought.id)}
            className="text-orange-500 hover:text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Nach 'Nicht kategorisiert' verschieben"
          >
            <FolderX className="h-4 w-4" />
          </button>
        ) : (
          // In "Nicht kategorisiert": Komplett löschen
          <button
            onClick={() => onDelete(thought.id)}
            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Löschen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default DraggableThought