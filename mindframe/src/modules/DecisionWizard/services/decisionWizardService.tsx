// src/modules/DecisionWizard/services/decisionWizardService.ts

import { v4 as uuidv4 } from 'uuid';
import type { Decision, Option, Criterion, Score } from '../types';

// Simuliere eine Verzögerung für die API-Anfragen
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Mock-Daten für die Entwicklung
const mockDecisions: Decision[] = [
  {
    id: '1',
    title: 'Wohnung kaufen oder mieten?',
    description: 'Entscheidung über die langfristige Wohnsituation',
    options: [
      { id: '1-1', text: 'Wohnung kaufen' },
      { id: '1-2', text: 'Wohnung mieten' },
    ],
    criteria: [
      { id: '1-1', text: 'Finanzielle Flexibilität', weight: 7 },
      { id: '1-2', text: 'Langfristige Investition', weight: 8 },
      { id: '1-3', text: 'Möbilitätsbedürfnis', weight: 6 },
    ],
    scores: [
      { optionId: '1-1', criterionId: '1-1', value: 4 },
      { optionId: '1-1', criterionId: '1-2', value: 9 },
      { optionId: '1-1', criterionId: '1-3', value: 3 },
      { optionId: '1-2', criterionId: '1-1', value: 8 },
      { optionId: '1-2', criterionId: '1-2', value: 3 },
      { optionId: '1-2', criterionId: '1-3', value: 9 },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user123',
    finalScore: [
      { optionId: '1-1', score: 5.71 },
      { optionId: '1-2', score: 6.52 },
    ],
    recommendation: 'Basierend auf deinen Kriterien und Gewichtungen ist "Wohnung mieten" die besser passende Option für dich.',
  },
  {
    id: '2',
    title: 'Neues Auto kaufen',
    description: 'Entscheidung über den Kauf eines neuen Autos',
    options: [
      { id: '2-1', text: 'Tesla Model 3' },
      { id: '2-2', text: 'VW ID.4' },
      { id: '2-3', text: 'Hyundai Ioniq 5' },
    ],
    criteria: [
      { id: '2-1', text: 'Preis', weight: 8 },
      { id: '2-2', text: 'Reichweite', weight: 9 },
      { id: '2-3', text: 'Design', weight: 5 },
      { id: '2-4', text: 'Ladegeschwindigkeit', weight: 7 },
    ],
    scores: [
      // Tesla
      { optionId: '2-1', criterionId: '2-1', value: 5 },
      { optionId: '2-1', criterionId: '2-2', value: 8 },
      { optionId: '2-1', criterionId: '2-3', value: 9 },
      { optionId: '2-1', criterionId: '2-4', value: 9 },
      
      // VW
      { optionId: '2-2', criterionId: '2-1', value: 6 },
      { optionId: '2-2', criterionId: '2-2', value: 7 },
      { optionId: '2-2', criterionId: '2-3', value: 6 },
      { optionId: '2-2', criterionId: '2-4', value: 7 },
      
      // Hyundai
      { optionId: '2-3', criterionId: '2-1', value: 7 },
      { optionId: '2-3', criterionId: '2-2', value: 6 },
      { optionId: '2-3', criterionId: '2-3', value: 8 },
      { optionId: '2-3', criterionId: '2-4', value: 8 },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user123',
    finalScore: [
      { optionId: '2-1', score: 7.55 },
      { optionId: '2-2', score: 6.52 },
      { optionId: '2-3', score: 7.10 },
    ],
    recommendation: 'Basierend auf deinen Kriterien und Gewichtungen ist "Tesla Model 3" die am besten passende Option für dich, gefolgt von "Hyundai Ioniq 5".',
  },
];

// Service-Funktionen
export const decisionWizardService = {
    fetchDecisions: async (): Promise<Decision[]> => {
        return mockDecisions;
      },
    fetchDecision: async (id: string): Promise<Decision> => {
        // Sonderbehandlung für 'new' oder undefined/null
        if (!id || id === 'new') {
          // Rückgabe eines leeren Decision-Templates statt eines Fehlers
          return {
            id: '',
            title: '',
            description: '',
            options: [],
            criteria: [],
            scores: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: 'user123', // Standard-User-ID
          };
        }
      
        await simulateApiDelay();
        const decision = mockDecisions.find(d => d.id === id);
        
        if (!decision) {
          throw new Error(`Entscheidung mit ID ${id} nicht gefunden`);
        }
        
        return { ...decision };
      },
  
  createDecision: async (decisionData: { title: string; description?: string }): Promise<Decision> => {
    await simulateApiDelay();
    
    const newDecision: Decision = {
      id: uuidv4(),
      title: decisionData.title,
      description: decisionData.description || '',
      options: [],
      criteria: [],
      scores: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user123', // In einer echten Anwendung aus dem Auth-Kontext
    };
    
    // In einer echten Anwendung würde es in die Datenbank eingefügt
    mockDecisions.push(newDecision);
    
    return newDecision;
  },
  
  updateDecision: async (decision: Partial<Decision> & { id: string }): Promise<Decision> => {
    await simulateApiDelay();
    
    const index = mockDecisions.findIndex(d => d.id === decision.id);
    
    if (index === -1) {
      throw new Error(`Entscheidung mit ID ${decision.id} nicht gefunden`);
    }
    
    const updatedDecision = {
      ...mockDecisions[index],
      ...decision,
      updatedAt: new Date().toISOString(),
    } as Decision;
    
    mockDecisions[index] = updatedDecision;
    
    return updatedDecision;
  },
  
  deleteDecision: async (id: string): Promise<void> => {
    await simulateApiDelay();
    
    const index = mockDecisions.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new Error(`Entscheidung mit ID ${id} nicht gefunden`);
    }
    
    mockDecisions.splice(index, 1);
  },
  
  addOption: async (decisionId: string, option: Omit<Option, 'id'>): Promise<Option> => {
    await simulateApiDelay();
    
    const decision = mockDecisions.find(d => d.id === decisionId);
    
    if (!decision) {
      throw new Error(`Entscheidung mit ID ${decisionId} nicht gefunden`);
    }
    
    const newOption: Option = {
      id: uuidv4(),
      text: option.text,
    };
    
    decision.options.push(newOption);
    decision.updatedAt = new Date().toISOString();
    
    return newOption;
  },
  
  addCriterion: async (decisionId: string, criterion: Omit<Criterion, 'id'>): Promise<Criterion> => {
    await simulateApiDelay();
    
    const decision = mockDecisions.find(d => d.id === decisionId);
    
    if (!decision) {
      throw new Error(`Entscheidung mit ID ${decisionId} nicht gefunden`);
    }
    
    const newCriterion: Criterion = {
      id: uuidv4(),
      text: criterion.text,
      weight: criterion.weight,
    };
    
    decision.criteria.push(newCriterion);
    decision.updatedAt = new Date().toISOString();
    
    return newCriterion;
  },
  
  updateScore: async (decisionId: string, score: Score): Promise<Score> => {
    await simulateApiDelay();
    
    const decision = mockDecisions.find(d => d.id === decisionId);
    
    if (!decision) {
      throw new Error(`Entscheidung mit ID ${decisionId} nicht gefunden`);
    }
    
    const existingScoreIndex = decision.scores.findIndex(
      s => s.optionId === score.optionId && s.criterionId === score.criterionId
    );
    
    if (existingScoreIndex !== -1) {
      decision.scores[existingScoreIndex] = score;
    } else {
      decision.scores.push(score);
    }
    
    decision.updatedAt = new Date().toISOString();
    
    return score;
  },
  
  evaluateDecision: async (id: string): Promise<{ id: string; finalScore: { optionId: string; score: number }[]; recommendation: string }> => {
    await simulateApiDelay();
    
    const decision = mockDecisions.find(d => d.id === id);
    
    if (!decision) {
      throw new Error(`Entscheidung mit ID ${id} nicht gefunden`);
    }
    
    // Berechne Scores für jede Option
    const optionScores = decision.options.map(option => {
      const criteriaScores = decision.criteria.map(criterion => {
        const score = decision.scores.find(
          s => s.optionId === option.id && s.criterionId === criterion.id
        );
        
        // Falls keine Bewertung existiert, verwende 5 als Standardwert (mittlerer Wert)
        const value = score ? score.value : 5;
        
        // Gewichteter Score für dieses Kriterium
        return value * (criterion.weight / 10);
      });
      
      // Durchschnitt der gewichteten Scores für diese Option
      const totalScore = criteriaScores.reduce((sum, score) => sum + score, 0) / decision.criteria.length;
      
      return {
        optionId: option.id,
        score: parseFloat(totalScore.toFixed(2)),
      };
    });
    
    // Sortiere Optionen nach Score (absteigend)
    optionScores.sort((a, b) => b.score - a.score);
    
    // Finde die Option mit dem höchsten Score
    const bestOption = decision.options.find(o => o.id === optionScores[0]?.optionId);
    
    // Generiere Empfehlung
    let recommendation = '';
    if (bestOption) {
      if (optionScores.length > 1 && optionScores[0]!.score - optionScores[1]!.score < 0.5) {
        const secondBestOption = decision.options.find(o => o.id === optionScores[1]?.optionId);
        recommendation = `Basierend auf deinen Kriterien und Gewichtungen ist "${bestOption.text}" knapp die beste Option für dich, dicht gefolgt von "${secondBestOption?.text}". Beide Optionen sind sehr ähnlich bewertet.`;
      } else {
        recommendation = `Basierend auf deinen Kriterien und Gewichtungen ist "${bestOption.text}" klar die beste Option für dich.`;
      }
    } else {
      recommendation = 'Es konnten keine Empfehlungen generiert werden. Bitte überprüfe deine Optionen und Kriterien.';
    }
    
    // Wichtig: Erstelle eine Kopie des Objekts, anstatt es direkt zu ändern
    const updatedDecision = {
      ...decision,
      finalScore: optionScores,
      recommendation,
      updatedAt: new Date().toISOString()
    };
    
    // Ersetze das alte Objekt im Array
    const index = mockDecisions.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDecisions[index] = updatedDecision;
    }
    
    return {
      id,
      finalScore: optionScores,
      recommendation,
    };
  } 
};