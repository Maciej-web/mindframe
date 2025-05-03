// src/modules/BrainOrganizer/store/brainOrganizerSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { brainOrganizerService } from '../services/brainOrganizerService';
import { aiService } from '../services/aiService';
import type { Thought, Cluster, BrainDump } from '../types/index';

interface BrainOrganizerState {
  brainDumps: BrainDump[];
  currentBrainDump: BrainDump | null;
  clusters: Cluster[];
  thoughts: Thought[];
  summary: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: BrainOrganizerState = {
  brainDumps: [],
  currentBrainDump: null,
  clusters: [],
  thoughts: [],
  summary: '',
  isLoading: false,
  error: null,
};

// Async Thunks
export const submitBrainDump = createAsyncThunk(
  'brainOrganizer/submitBrainDump',
  async (content: string, { rejectWithValue }) => {
    try {
      const brainDump = await brainOrganizerService.saveBrainDump(content);
      const thoughts = await aiService.splitIntoThoughts(content);
      return { brainDump, thoughts };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const clusterThoughts = createAsyncThunk(
  'brainOrganizer/clusterThoughts',
  async (thoughts: Thought[], { rejectWithValue }) => {
    try {
      const clusters = await aiService.clusterThoughts(thoughts);
      return clusters;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const reassignThought = createAsyncThunk(
  'brainOrganizer/reassignThought',
  async ({ thoughtId, clusterId }: { thoughtId: string; clusterId: string }, { rejectWithValue }) => {
    try {
      return await brainOrganizerService.reassignThought(thoughtId, clusterId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const renameCluster = createAsyncThunk(
  'brainOrganizer/renameCluster',
  async ({ clusterId, name }: { clusterId: string; name: string }, { rejectWithValue }) => {
    try {
      return await brainOrganizerService.renameCluster(clusterId, name);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchSummary = createAsyncThunk(
  'brainOrganizer/fetchSummary',
  async (brainDumpId: string, { rejectWithValue }) => {
    try {
      return await aiService.generateSummary(brainDumpId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createCluster = createAsyncThunk(
  'brainOrganizer/createCluster',
  async (name: string, { rejectWithValue }) => {
    try {
      return await brainOrganizerService.createCluster(name);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteCluster = createAsyncThunk(
  'brainOrganizer/deleteCluster',
  async (clusterId: string, { rejectWithValue }) => {
    try {
      return await brainOrganizerService.deleteCluster(clusterId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const brainOrganizerSlice = createSlice({
  name: 'brainOrganizer',
  initialState,
  reducers: {
    setCurrentBrainDump: (state, action: PayloadAction<BrainDump>) => {
      state.currentBrainDump = action.payload;
    },
    clearCurrentBrainDump: (state) => {
      state.currentBrainDump = null;
      state.thoughts = [];
      state.clusters = [];
      state.summary = '';
    },
    updateThought: (state, action: PayloadAction<Thought>) => {
      const index = state.thoughts.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.thoughts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle submitBrainDump
      .addCase(submitBrainDump.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitBrainDump.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBrainDump = action.payload.brainDump;
        state.thoughts = action.payload.thoughts;
        state.brainDumps.push(action.payload.brainDump);
      })
      .addCase(submitBrainDump.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Handle clusterThoughts
      .addCase(clusterThoughts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clusterThoughts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clusters = action.payload;
      })
      .addCase(clusterThoughts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchSummary
      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Handle reassignThought
      .addCase(reassignThought.fulfilled, (state, action) => {
        const { thoughtId, clusterId } = action.payload;
        const thoughtIndex = state.thoughts.findIndex(t => t.id === thoughtId);
        if (thoughtIndex !== -1) {
          const thought = state.thoughts[thoughtIndex];
          if (thought) {
            thought.clusterId = clusterId;
          }
        }
      })
      
      // Handle renameCluster
      .addCase(renameCluster.fulfilled, (state, action) => {
        const { clusterId, name } = action.payload;
        const clusterIndex = state.clusters.findIndex(c => c.id === clusterId);
        if (clusterIndex !== -1) {
          const cluster = state.clusters[clusterIndex];
          if (cluster) {
            cluster.name = name;
          }
        }
      })
      
      // Handle createCluster
      .addCase(createCluster.fulfilled, (state, action) => {
        state.clusters.push(action.payload);
      })
      
      // Handle deleteCluster
      .addCase(deleteCluster.fulfilled, (state, action) => {
        const clusterId = action.payload;
        state.clusters = state.clusters.filter(c => c.id !== clusterId);
        
        // Reassign thoughts that were in this cluster to null (uncategorized)
        state.thoughts = state.thoughts.map(thought => {
          if (thought.clusterId === clusterId) {
            return { ...thought, clusterId: null };
          }
          return thought;
        });
      });
  },
});

export const { setCurrentBrainDump, clearCurrentBrainDump, updateThought } = brainOrganizerSlice.actions;

export default brainOrganizerSlice.reducer;