// src/modules/BrainOrganizer/components/ClusterSummaryList.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store'
import type { RootState } from '../../../store'
import {
  CheckSquare,
  Lightbulb,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Heart,
  Leaf,
  Music,
  Code,
  Camera,
  Globe,
  Star,
  Coffee,
} from 'lucide-react'
import type { Thought, Cluster } from '../types'

//
// Typ für die Styling-Infos eines Clusters
//
type ClusterStyle = {
  icon: React.ReactNode
  color: string
  textColor: string
}

//
// Liefert für einen Cluster-Namen ein Icon + Farben zurück, niemals undefined
//
const getIconForCluster = (name: string): ClusterStyle => {
  const lower = name.toLowerCase()

  if (lower.includes('work') || lower.includes('arbeit') || lower.includes('job') || lower.includes('beruf'))
    return {
      icon: <Briefcase className="text-emerald-500 h-6 w-6" />,
      color: 'from-emerald-400 to-emerald-300',
      textColor: 'text-emerald-600',
    }

  if (lower.includes('creative') || lower.includes('idee') || lower.includes('kreativ'))
    return {
      icon: <Lightbulb className="text-rose-500 h-6 w-6" />,
      color: 'from-rose-400 to-rose-300',
      textColor: 'text-rose-600',
    }

  if (lower.includes('personal') || lower.includes('persönlich') || lower.includes('self'))
    return {
      icon: <Heart className="text-pink-500 h-6 w-6" />,
      color: 'from-pink-400 to-pink-300',
      textColor: 'text-pink-600',
    }

  if (lower.includes('learn') || lower.includes('lern') || lower.includes('wissen'))
    return {
      icon: <BookOpen className="text-blue-500 h-6 w-6" />,
      color: 'from-blue-400 to-blue-300',
      textColor: 'text-blue-600',
    }

  if (lower.includes('health') || lower.includes('gesund') || lower.includes('fitness'))
    return {
      icon: <Leaf className="text-green-500 h-6 w-6" />,
      color: 'from-green-400 to-green-300',
      textColor: 'text-green-600',
    }

  if (lower.includes('task') || lower.includes('aufgabe') || lower.includes('todo'))
    return {
      icon: <CheckSquare className="text-sky-500 h-6 w-6" />,
      color: 'from-sky-400 to-sky-300',
      textColor: 'text-sky-600',
    }

  if (lower.includes('growth') || lower.includes('wachstum') || lower.includes('entwicklung'))
    return {
      icon: <ArrowUpRight className="text-purple-500 h-6 w-6" />,
      color: 'from-purple-400 to-purple-300',
      textColor: 'text-purple-600',
    }

  if (lower.includes('goal') || lower.includes('ziel'))
    return {
      icon: <Star className="text-amber-500 h-6 w-6" />,
      color: 'from-amber-400 to-amber-300',
      textColor: 'text-amber-600',
    }

  if (lower.includes('hobby') || lower.includes('freizeit'))
    return {
      icon: <Coffee className="text-orange-500 h-6 w-6" />,
      color: 'from-orange-400 to-orange-300',
      textColor: 'text-orange-600',
    }

  if (lower.includes('music') || lower.includes('musik') || lower.includes('song'))
    return {
      icon: <Music className="text-indigo-500 h-6 w-6" />,
      color: 'from-indigo-400 to-indigo-300',
      textColor: 'text-indigo-600',
    }

  if (lower.includes('tech') || lower.includes('technologie') || lower.includes('code'))
    return {
      icon: <Code className="text-gray-500 h-6 w-6" />,
      color: 'from-gray-400 to-gray-300',
      textColor: 'text-gray-600',
    }

  if (lower.includes('photo') || lower.includes('foto') || lower.includes('bild'))
    return {
      icon: <Camera className="text-cyan-500 h-6 w-6" />,
      color: 'from-cyan-400 to-cyan-300',
      textColor: 'text-cyan-600',
    }

  if (lower.includes('travel') || lower.includes('reise') || lower.includes('trip'))
    return {
      icon: <Globe className="text-teal-500 h-6 w-6" />,
      color: 'from-teal-400 to-teal-300',
      textColor: 'text-teal-600',
    }

  // Fallback-Array garantiert nicht leer → Non-null Assertion
  const fallback: ClusterStyle[] = [
    { icon: <Lightbulb className="text-rose-500 h-6 w-6" />, color: 'from-rose-400 to-rose-300', textColor: 'text-rose-600' },
    { icon: <CheckSquare className="text-sky-500 h-6 w-6" />, color: 'from-sky-400 to-sky-300', textColor: 'text-sky-600' },
    { icon: <Leaf className="text-green-500 h-6 w-6" />, color: 'from-green-400 to-green-300', textColor: 'text-green-600' },
    { icon: <ArrowUpRight className="text-purple-500 h-6 w-6" />, color: 'from-purple-400 to-purple-300', textColor: 'text-purple-600' },
    { icon: <Star className="text-amber-500 h-6 w-6" />, color: 'from-amber-400 to-amber-300', textColor: 'text-amber-600' },
    { icon: <Coffee className="text-orange-500 h-6 w-6" />, color: 'from-orange-400 to-orange-300', textColor: 'text-orange-600' },
  ]
  return fallback[Math.floor(Math.random() * fallback.length)]!
}

const ClusterSummaryList: React.FC = () => {
  const navigate = useNavigate()

  // genau typisierte Auswahl
  const { clusters, thoughts } = useAppSelector(
    (state: RootState) => state.brainOrganizer
  )

 
  // Ohne generischen Type-Argument: casten des Initialwerts
  const thoughtsByCluster = clusters.reduce(
    (acc: Record<string, Thought[]>, cluster: Cluster) => {
      acc[cluster.id] = thoughts.filter((t: Thought) => t.clusterId === cluster.id)
      return acc
    },
    {} as Record<string, Thought[]>
  )


  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-navy-900 mb-6">
        Deine organisierten Gedanken
      </h2>
      <div className="space-y-4">
        {clusters.map((cluster: Cluster) => {
          const clusterThoughts = thoughtsByCluster[cluster.id] || []
          const clusterStyle = getIconForCluster(cluster.name)
          const summary =
            cluster.description ||
            `Eine Sammlung von Gedanken zum Thema ${cluster.name}.`

          return (
            <div
              key={cluster.id}
              className="border rounded-lg cursor-pointer transition-all hover:shadow-md bg-white overflow-hidden"
              onClick={() =>
                navigate(`/brain-organizer/clusters/${cluster.id}`)
              }
            >
              <div
                className={`h-2 bg-gradient-to-r ${clusterStyle.color} rounded-t-lg`}
              />

              <div className="flex items-start p-5">
                <div className="mr-4 mt-1">{clusterStyle.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-navy-800">
                      {cluster.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 ${clusterStyle.textColor} bg-gray-100`}
                    >
                      {clusterThoughts.length} Gedanken
                    </span>
                  </div>
                  <p className="text-navy-600 mb-4">{summary}</p>
                  <div className="flex justify-end">
                    <div className="flex items-center text-primary hover:text-primary-dark text-sm font-medium">
                      Details anzeigen
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2-293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClusterSummaryList
