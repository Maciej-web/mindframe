// src/modules/DecisionWizard/types/index.ts

/**
 * Eine Option in einer Entscheidungsfindung
 */
export interface Option {
    id: string;
    text: string;
  }
  
  /**
   * Ein Kriterium, das bei der Entscheidungsfindung berücksichtigt wird
   */
  export interface Criterion {
    id: string;
    text: string;
    weight: number; // 1-10, wobei 10 am wichtigsten ist
  }
  
  /**
   * Eine Bewertung einer Option bezüglich eines Kriteriums
   */
  export interface Score {
    optionId: string;
    criterionId: string;
    value: number; // 1-10, wobei 10 die beste Bewertung ist
  }
  
  /**
   * Eine Entscheidung mit allen zugehörigen Daten
   */
  export interface Decision {
    id: string;
    title: string;
    description?: string;
    options: Option[];
    criteria: Criterion[];
    scores: Score[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    finalScore?: {
      optionId: string;
      score: number;
    }[];
    recommendation?: string;
  }
  
  /**
   * Enum für den Status des Decision Wizards
   */
  export enum DecisionWizardStep {
    TITLE = 'title',
    OPTIONS = 'options',
    CRITERIA = 'criteria',
    MATRIX = 'matrix',
    RESULT = 'result'
  }
  
  /**
   * Status eines async Thunks
   */
  export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';