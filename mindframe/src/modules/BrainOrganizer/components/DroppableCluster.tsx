// src/modules/BrainOrganizer/components/DroppableCluster.tsx
import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../../store'
import { reassignThought, deleteCluster } from '../store/BrainOrganizerSlice'
import DraggableThought from './DraggableThought'
import type { Cluster, Thought } from '../types'
import {
  GripVertical,
  Pencil,
  Trash2,
  CheckSquare,
  Lightbulb,
  ArrowUpRight,
  BookOpen,
  Coffee,
  Star,
  Heart,
  Briefcase,
  Leaf,
  Music,
  Code,
  Camera,
  Globe,
  FolderX,
} from 'lucide-react'

//
// 1) Typ für das Style-Objekt definieren
//
type ClusterStyle = {
  icon: React.ReactNode
  color: string
  textColor: string
}

//
// 2) Rückgabewert von getIconForCluster eindeutig typisieren
//
const getIconForCluster = (name: string): ClusterStyle => {
  const lower = name.toLowerCase()

  if (lower.includes('work') || lower.includes('arbeit') || lower.includes('job') || lower.includes('beruf'))
    return {
      icon: <Briefcase className="h-6 w-6" />,
      color: 'from-emerald-400 to-emerald-300',
      textColor: 'text-emerald-600',
    }

  if (lower.includes('creative') || lower.includes('idee') || lower.includes('kreativ'))
    return {
      icon: <Lightbulb className="h-6 w-6" />,
      color: 'from-rose-400 to-rose-300',
      textColor: 'text-rose-600',
    }

  if (lower.includes('personal') || lower.includes('persönlich') || lower.includes('self'))
    return {
      icon: <Heart className="h-6 w-6" />,
      color: 'from-pink-400 to-pink-300',
      textColor: 'text-pink-600',
    }

  if (lower.includes('learn') || lower.includes('lern') || lower.includes('wissen'))
    return {
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-blue-400 to-blue-300',
      textColor: 'text-blue-600',
    }

  if (lower.includes('health') || lower.includes('gesund') || lower.includes('fitness'))
    return {
      icon: <Leaf className="h-6 w-6" />,
      color: 'from-green-400 to-green-300',
      textColor: 'text-green-600',
    }

  if (lower.includes('task') || lower.includes('aufgabe') || lower.includes('todo'))
    return {
      icon: <CheckSquare className="h-6 w-6" />,
      color: 'from-sky-400 to-sky-300',
      textColor: 'text-sky-600',
    }

  if (lower.includes('growth') || lower.includes('wachstum') || lower.includes('entwicklung'))
    return {
      icon: <ArrowUpRight className="h-6 w-6" />,
      color: 'from-purple-400 to-purple-300',
      textColor: 'text-purple-600',
    }

  if (lower.includes('goal') || lower.includes('ziel'))
    return {
      icon: <Star className="h-6 w-6" />,
      color: 'from-amber-400 to-amber-300',
      textColor: 'text-amber-600',
    }

  if (lower.includes('hobby') || lower.includes('freizeit'))
    return {
      icon: <Coffee className="h-6 w-6" />,
      color: 'from-orange-400 to-orange-300',
      textColor: 'text-orange-600',
    }

  if (lower.includes('music') || lower.includes('musik') || lower.includes('song'))
    return {
      icon: <Music className="h-6 w-6" />,
      color: 'from-indigo-400 to-indigo-300',
      textColor: 'text-indigo-600',
    }

  if (lower.includes('tech') || lower.includes('technologie') || lower.includes('code'))
    return {
      icon: <Code className="h-6 w-6" />,
      color: 'from-gray-400 to-gray-300',
      textColor: 'text-gray-600',
    }

  if (lower.includes('photo') || lower.includes('foto') || lower.includes('bild'))
    return {
      icon: <Camera className="h-6 w-6" />,
      color: 'from-cyan-400 to-cyan-300',
      textColor: 'text-cyan-600',
    }

  if (lower.includes('travel') || lower.includes('reise') || lower.includes('trip'))
    return {
      icon: <Globe className="h-6 w-6" />,
      color: 'from-teal-400 to-teal-300',
      textColor: 'text-teal-600',
    }

  // Fallback-Styles
  const fallback: ClusterStyle[] = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      color: 'from-rose-400 to-rose-300',
      textColor: 'text-rose-600',
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      color: 'from-sky-400 to-sky-300',
      textColor: 'text-sky-600',
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      color: 'from-green-400 to-green-300',
      textColor: 'text-green-600',
    },
    {
      icon: <ArrowUpRight className="h-6 w-6" />,
      color: 'from-purple-400 to-purple-300',
      textColor: 'text-purple-600',
    },
    {
      icon: <Star className="h-6 w-6" />,
      color: 'from-amber-400 to-amber-300',
      textColor: 'text-amber-600',
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      color: 'from-orange-400 to-orange-300',
      textColor: 'text-orange-600',
    },
  ]
  return fallback[Math.floor(Math.random() * fallback.length)]!
}

interface DroppableClusterProps {
  cluster: Cluster
  thoughts: Thought[]
  onEditThought: (thought: Thought) => void
  onEditCluster: (cluster: Cluster) => void
  onDeleteThought: (thoughtId: string) => void
}

const DroppableCluster: React.FC<DroppableClusterProps> = ({
  cluster,
  thoughts,
  onEditThought,
  onEditCluster,
  onDeleteThought,
}) => {
  const dispatch = useAppDispatch()
  const [isOver, drop] = useDrop({
    accept: 'THOUGHT',
    drop: (item: { id: string }) => {
      dispatch(
        reassignThought({
          thoughtId: item.id,
          clusterId: cluster.id,
        })
      )
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  // TS weiß jetzt: clusterStyle ist immer ein ClusterStyle
  const clusterStyle = getIconForCluster(cluster.name)

  const handleDeleteCluster = () => {
    if (
      window.confirm(
        `Möchtest du das Cluster "${cluster.name}" wirklich löschen?`
      )
    ) {
      dispatch(deleteCluster(cluster.id))
    }
  }

  // Funktion zum Verschieben von Gedanken in "Nicht kategorisiert"
  const handleMoveToUncategorized = (thoughtId: string) => {
    dispatch(
      reassignThought({
        thoughtId,
        clusterId: ''
      })
    )
  }

  return (
    <div
      ref={node => {
        drop(node)
      }}
      className={`rounded-lg border border-gray-200 overflow-hidden group transition-all
        hover:shadow-md ${isOver ? 'shadow-lg border-blue-300' : ''}`}
    >
      <div
        className={`h-2 bg-gradient-to-r ${clusterStyle.color} rounded-t-lg`}
      />

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`mr-3 ${clusterStyle.textColor}`}>
              {clusterStyle.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold pt-2">
                {cluster.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {cluster.description}
              </p>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEditCluster(cluster)}
              title="Cluster bearbeiten"
            >
              <Pencil className="h-5 w-5 text-primary hover:text-primary-dark" />
            </button>
            <button
              onClick={handleDeleteCluster}
              title="Cluster löschen"
            >
              <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {thoughts.length === 0 ? (
            <p className="col-span-full py-8 text-center text-gray-400 italic">
              Ziehe Gedanken hierher
            </p>
          ) : (
            thoughts.map((thought) => (
              <DraggableThought
                key={thought.id}
                thought={thought}
                onEdit={() => {}} // Keine Bearbeitungsfunktion in Clustern
                onDelete={() => handleMoveToUncategorized(thought.id)} // Hiermit wird statt Löschen nach Uncategorized verschoben
                onMoveToUncategorized={handleMoveToUncategorized}
                editable={false}
                inCluster={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DroppableCluster