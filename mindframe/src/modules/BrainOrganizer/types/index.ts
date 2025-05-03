// src/modules/BrainOrganizer/types/index.ts

export interface Thought {
    id: string;
    content: string;
    clusterId: string | null;
    originalContent?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Cluster {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BrainDump {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    title?: string;
  }