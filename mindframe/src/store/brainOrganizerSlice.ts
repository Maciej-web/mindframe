import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Pseudo-Service für BrainOrganizer (wird später durch echte API ersetzt)
const brainOrganizerService = {
  fetchBrainDumps: async (): Promise<BrainDump[]> => {
    // Simuliert einen API-Call mit 700ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock-Daten zurückgeben
    return [
      {
        id: 'dump_1',
        content: 'Idee für neues Projekt: KI-gestützte Zeitplanung',
        tags: ['idee', 'projekt', 'ki'],
        clusters: ['Projektideen'],
        createdAt: Date.now() - 86400000, // 1 Tag zurück
        updatedAt: Date.now() - 86400000,
      },
      {
        id: 'dump_2',
        content: 'Meeting mit Marketing-Team für Q2-Strategie planen',
        tags: ['aufgabe', 'meeting', 'marketing'],
        clusters: ['Arbeit'],
        createdAt: Date.now() - 172800000, // 2 Tage zurück
        updatedAt: Date.now() - 172800000,
      }
    ];
  },
  
  saveBrainDump: async (brainDump: Omit<BrainDump, 'id' | 'createdAt' | 'updatedAt'>): Promise<BrainDump> => {
    // Simuliert einen API-Call mit 500ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = Date.now();
    const newBrainDump: BrainDump = {
      ...brainDump,
      id: `dump_${timestamp}`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    return newBrainDump;
  },
  
  clusterBrainDumps: async (brainDumps: BrainDump[]): Promise<{id: string, clusters: string[]}[]> => {
    // Simuliert einen API-Call zu OpenAI/Claude mit 1500ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simuliere KI-Clustering-Ergebnis
    return brainDumps.map(dump => ({
      id: dump.id,
      clusters: dump.content.toLowerCase().includes('projekt') ? ['Projektideen'] :
               dump.content.toLowerCase().includes('meeting') ? ['Arbeit'] :
               dump.content.toLowerCase().includes('idee') ? ['Ideen'] : 
               ['Sonstiges']
    }));
  }
};

// Typen für Brain Organizer
export interface BrainDump {
  id: string;
  content: string;
  tags: string[];
  clusters?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface BrainOrganizerState {
  brainDumps: BrainDump[];
  clusters: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initialer State
const initialState: BrainOrganizerState = {
  brainDumps: [],
  clusters: [],
  status: 'idle',
  error: null,
};

// Async Thunks für API-Operationen
export const fetchBrainDumps = createAsyncThunk(
  'brainOrganizer/fetchBrainDumps',
  async (_, { rejectWithValue }) => {
    try {
      const brainDumps = await brainOrganizerService.fetchBrainDumps();
      return brainDumps;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch brain dumps');
    }
  }
);

export const saveBrainDump = createAsyncThunk(
  'brainOrganizer/saveBrainDump',
  async (brainDump: Omit<BrainDump, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newBrainDump = await brainOrganizerService.saveBrainDump(brainDump);
      return newBrainDump;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to save brain dump');
    }
  }
);

export const clusterBrainDumps = createAsyncThunk(
  'brainOrganizer/clusterBrainDumps',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const brainDumps = state.brainOrganizer.brainDumps;
      
      if (brainDumps.length === 0) {
        return [];
      }
      
      const clusterResults = await brainOrganizerService.clusterBrainDumps(brainDumps);
      return clusterResults;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to cluster brain dumps');
    }
  }
);

// Brain Organizer Slice
const brainOrganizerSlice = createSlice({
  name: 'brainOrganizer',
  initialState,
  reducers: {
    // Synchrone Reducer-Funktionen
    addBrainDump: (state, action: PayloadAction<Omit<BrainDump, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const timestamp = Date.now();
      state.brainDumps.push({
        ...action.payload,
        id: `dump_${timestamp}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    updateBrainDump: (state, action: PayloadAction<{ id: string; content?: string; tags?: string[] }>) => {
      const { id, ...updates } = action.payload;
      const brainDump = state.brainDumps.find(dump => dump.id === id);
      if (brainDump) {
        Object.assign(brainDump, { ...updates, updatedAt: Date.now() });
      }
    },
    removeBrainDump: (state, action: PayloadAction<string>) => {
      state.brainDumps = state.brainDumps.filter(dump => dump.id !== action.payload);
    },
    assignClusters: (state, action: PayloadAction<{ id: string; clusters: string[] }>) => {
      const { id, clusters } = action.payload;
      const brainDump = state.brainDumps.find(dump => dump.id === id);
      if (brainDump) {
        brainDump.clusters = clusters;
        brainDump.updatedAt = Date.now();
      }
      
      // Aktualisiere die Liste aller Cluster
      const allClusters = new Set(state.clusters);
      clusters.forEach(cluster => allClusters.add(cluster));
      state.clusters = Array.from(allClusters);
    },
    clearBrainOrganizerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBrainDumps
      .addCase(fetchBrainDumps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrainDumps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brainDumps = action.payload;
        
        // Extrahiere alle einzigartigen Cluster
        const allClusters = new Set<string>();
        action.payload.forEach(dump => {
          dump.clusters?.forEach(cluster => allClusters.add(cluster));
        });
        state.clusters = Array.from(allClusters);
      })
      .addCase(fetchBrainDumps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // saveBrainDump
      .addCase(saveBrainDump.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveBrainDump.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brainDumps.push(action.payload);
      })
      .addCase(saveBrainDump.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // clusterBrainDumps
      .addCase(clusterBrainDumps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clusterBrainDumps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Aktualisiere die Cluster für jeden BrainDump
        const allClusters = new Set(state.clusters);
        
        action.payload.forEach(result => {
          const brainDump = state.brainDumps.find(dump => dump.id === result.id);
          if (brainDump) {
            brainDump.clusters = result.clusters;
            brainDump.updatedAt = Date.now();
            
            // Sammle alle einzigartigen Cluster
            result.clusters.forEach(cluster => allClusters.add(cluster));
          }
        });
        
        state.clusters = Array.from(allClusters);
      })
      .addCase(clusterBrainDumps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Actions exportieren
export const { 
  addBrainDump, 
  updateBrainDump, 
  removeBrainDump, 
  assignClusters,
  clearBrainOrganizerError
} = brainOrganizerSlice.actions;

// Selectors
export const selectAllBrainDumps = (state: RootState) => state.brainOrganizer.brainDumps;
export const selectBrainDumpById = (state: RootState, id: string) => 
  state.brainOrganizer.brainDumps.find(dump => dump.id === id);
export const selectBrainDumpsByCluster = (state: RootState, cluster: string) =>
  state.brainOrganizer.brainDumps.filter(dump => dump.clusters?.includes(cluster));
export const selectAllClusters = (state: RootState) => state.brainOrganizer.clusters;
export const selectBrainOrganizerStatus = (state: RootState) => state.brainOrganizer.status;
export const selectBrainOrganizerError = (state: RootState) => state.brainOrganizer.error;
export const selectIsLoading = (state: RootState) => state.brainOrganizer.status === 'loading';

export default brainOrganizerSlice.reducer;