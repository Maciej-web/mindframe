// src/modules/BrainOrganizer/services/brainOrganizerService.ts
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import type { BrainDump, Thought, Cluster } from '../types'

/**
 * Verschiebt einen Thought in einen neuen Cluster (oder entfernt ihn, wenn clusterId = null).
 * Named-Export, so dass man auch direkt
 *   import { reassignThought } from '…/brainOrganizerService'
 * nutzen kann.
 */
export async function reassignThought(
  thoughtId: string,
  clusterId: string | null
): Promise<Thought> {
  // Body nur mit clusterId, wenn nicht null
  const body: { thoughtId: string; clusterId?: string } = { thoughtId }
  if (clusterId !== null) {
    body.clusterId = clusterId
  }

  // Echte API-Anfrage
  const response = await axios.post<Thought>('/api/thoughts/reassign', body)
  return response.data

  // Falls noch kein Backend vorhanden, alternativ mocken:
  // return {
  //   id: thoughtId,
  //   content: '',                     // ggf. Platzhalter
  //   clusterId,                       // string | null
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // } as Thought
}

/**
 * Das zentrale Service-Objekt mit allen Methoden
 */
export const brainOrganizerService = {
  /** Speichert den Raw-Text und gibt einen BrainDump zurück */
  saveBrainDump: async (content: string): Promise<BrainDump> => {
    const brainDump: BrainDump = {
      id: uuidv4(),
      content,
      userId: 'current-user-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return brainDump
  },

  /** Benennt einen Cluster um */
  renameCluster: async (
    clusterId: string,
    name: string
  ): Promise<Cluster> => {
    return {
      id: clusterId,
      name,
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  /** Erstellt einen neuen Cluster */
  createCluster: async (name: string): Promise<Cluster> => {
    return {
      id: uuidv4(),
      name,
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  /** Löscht einen Cluster und gibt seine ID zurück */
  deleteCluster: async (clusterId: string): Promise<string> => {
    return clusterId
  },

  // Die neu exportierte Funktion als Property nachreichen
  reassignThought,
}
