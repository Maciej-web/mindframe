// src/modules/DecisionWizard/store/decisionWizardSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Decision, Status, Option, Criterion, Score } from '../types';
import { decisionWizardService } from '../services/decisionWizardService';
import type { RootState } from '@/store';

interface DecisionWizardState {
  decisions: Decision[];
  currentDecision: Decision | null;
  status: Status;
  error: string | null;
}

const initialState: DecisionWizardState = {
  decisions: [],
  currentDecision: null,
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchDecisions = createAsyncThunk(
  'decisionWizard/fetchDecisions',
  async (_, { rejectWithValue }) => {
    try {
      return await decisionWizardService.fetchDecisions();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDecision = createAsyncThunk(
  'decisionWizard/fetchDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      return await decisionWizardService.fetchDecision(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createDecision = createAsyncThunk(
  'decisionWizard/createDecision',
  async (decisionData: { title: string; description?: string }, { rejectWithValue }) => {
    try {
      return await decisionWizardService.createDecision(decisionData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateDecision = createAsyncThunk(
  'decisionWizard/updateDecision',
  async (decision: Partial<Decision> & { id: string }, { rejectWithValue }) => {
    try {
      return await decisionWizardService.updateDecision(decision);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteDecision = createAsyncThunk(
  'decisionWizard/deleteDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      await decisionWizardService.deleteDecision(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addOption = createAsyncThunk(
  'decisionWizard/addOption',
  async ({ decisionId, option }: { decisionId: string; option: Omit<Option, 'id'> }, { rejectWithValue }) => {
    try {
      return await decisionWizardService.addOption(decisionId, option);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addCriterion = createAsyncThunk(
  'decisionWizard/addCriterion',
  async ({ decisionId, criterion }: { decisionId: string; criterion: Omit<Criterion, 'id'> }, { rejectWithValue }) => {
    try {
      return await decisionWizardService.addCriterion(decisionId, criterion);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateScore = createAsyncThunk(
  'decisionWizard/updateScore',
  async ({ decisionId, score }: { decisionId: string; score: Score }, { rejectWithValue }) => {
    try {
      return await decisionWizardService.updateScore(decisionId, score);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const evaluateDecision = createAsyncThunk(
  'decisionWizard/evaluateDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      return await decisionWizardService.evaluateDecision(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const decisionWizardSlice = createSlice({
  name: 'decisionWizard',
  initialState,
  reducers: {
    setCurrentDecision: (state, action: PayloadAction<Decision>) => {
      state.currentDecision = action.payload;
    },
    clearCurrentDecision: (state) => {
      state.currentDecision = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDecisions
      .addCase(fetchDecisions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDecisions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.decisions = action.payload;
      })
      .addCase(fetchDecisions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // fetchDecision
      .addCase(fetchDecision.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDecision.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentDecision = action.payload;
      })
      .addCase(fetchDecision.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // createDecision
      .addCase(createDecision.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createDecision.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.decisions.push(action.payload);
        state.currentDecision = action.payload;
      })
      .addCase(createDecision.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // updateDecision
      .addCase(updateDecision.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateDecision.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.decisions.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.decisions[index] = action.payload;
        }
        state.currentDecision = action.payload;
      })
      .addCase(updateDecision.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // deleteDecision
      .addCase(deleteDecision.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteDecision.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.decisions = state.decisions.filter(d => d.id !== action.payload);
        if (state.currentDecision && state.currentDecision.id === action.payload) {
          state.currentDecision = null;
        }
      })
      .addCase(deleteDecision.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // addOption
      .addCase(addOption.fulfilled, (state, action) => {
        if (state.currentDecision) {
          if (!state.currentDecision.options) {
            state.currentDecision.options = [];
          }
          state.currentDecision.options.push(action.payload);
        }
      })
      
      // addCriterion
      .addCase(addCriterion.fulfilled, (state, action) => {
        if (state.currentDecision) {
          if (!state.currentDecision.criteria) {
            state.currentDecision.criteria = [];
          }
          state.currentDecision.criteria.push(action.payload);
        }
      })
      
      .addCase(updateScore.fulfilled, (state, action) => {
        const cd = state.currentDecision;
        if (!cd) return;
      
        // 1) Nimm vorhandene scores oder lege ein leeres Array an
        const scores: Score[] = cd.scores ?? [];
        // 2) Schreib das Array zurück in den Draft
        cd.scores = scores;
      
        const { optionId, criterionId, value } = action.payload;
        const scoreIndex = scores.findIndex(
          s => s.optionId === optionId && s.criterionId === criterionId
        );
      
        if (scoreIndex !== -1) {
          // TS weiß: `scores` ist Score[], also niemals undefined
          scores[scoreIndex]!.value = value;
        } else {
          scores.push(action.payload);
        }
      })
      
      
      
      
      // evaluateDecision
      .addCase(evaluateDecision.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(evaluateDecision.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, finalScore, recommendation } = action.payload;
        
        // Aktualisiere das aktuelle Decision-Objekt
        if (state.currentDecision && state.currentDecision.id === id) {
          state.currentDecision.finalScore = finalScore;
          state.currentDecision.recommendation = recommendation;
        }
        
        // Aktualisiere auch in der Liste
        const index = state.decisions.findIndex(d => d.id === id);
        if (index !== -1) {
          state.decisions[index]!.finalScore = finalScore;
          state.decisions[index]!.recommendation = recommendation;
        }
      })
      .addCase(evaluateDecision.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllDecisions = (state: RootState) => state.decisionWizard.decisions;
export const selectCurrentDecision = (state: RootState) => state.decisionWizard.currentDecision;
export const selectDecisionStatus = (state: RootState) => state.decisionWizard.status;
export const selectDecisionError = (state: RootState) => state.decisionWizard.error;
export const selectDecisionById = (id: string) => (state: RootState) => 
  state.decisionWizard.decisions.find((d: Decision) => d.id === id);

export const { setCurrentDecision, clearCurrentDecision, resetError } = decisionWizardSlice.actions;

export default decisionWizardSlice.reducer;