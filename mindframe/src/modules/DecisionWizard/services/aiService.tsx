// src/modules/DecisionWizard/services/aiService.ts

import type { Decision } from '../types';

// Simuliere eine Verzögerung für die API-Anfragen
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1500));

// Mögliche AI-Prompt-Struktur für die OpenAI/Anthropic API
const generateAiPrompt = (type: string, content: any) => {
  switch (type) {
    case 'analyzeDecision':
      return {
        messages: [
          {
            role: 'system',
            content: 'Du bist ein KI-Assistent, der Menschen bei Entscheidungsfindungen hilft. Deine Aufgabe ist es, eine Entscheidungsmatrix zu analysieren und Einblicke zu geben.'
          },
          {
            role: 'user',
            content: `Analysiere diese Entscheidungsmatrix und gib Einblicke, warum eine Option besser abschneidet als die andere. Berücksichtige die Gewichtungen der Kriterien. Schreibe in der ersten Person aus Sicht eines Beraters/Coaches.\n\n${JSON.stringify(content)}`
          }
        ]
      };
    case 'suggestImprovements':
      return {
        messages: [
          {
            role: 'system',
            content: 'Du bist ein KI-Assistent, der Menschen bei Entscheidungsfindungen hilft. Deine Aufgabe ist es, Verbesserungsvorschläge für eine Entscheidungsmatrix zu geben.'
          },
          {
            role: 'user',
            content: `Analysiere diese Entscheidungsmatrix und schlage Verbesserungen vor. Fehlen wichtige Kriterien? Sind die Gewichtungen ausgewogen? Gib konkrete Vorschläge zur Verbesserung des Entscheidungsprozesses.\n\n${JSON.stringify(content)}`
          }
        ]
      };
    case 'generateSummary':
      return {
        messages: [
          {
            role: 'system',
            content: 'Du bist ein KI-Assistent, der Menschen bei Entscheidungsfindungen hilft. Deine Aufgabe ist es, eine knappe Zusammenfassung einer Entscheidung zu liefern.'
          },
          {
            role: 'user',
            content: `Erstelle eine kurze Zusammenfassung (2-3 Sätze) dieser Entscheidung. Nenne die beste Option und die wichtigsten Faktoren, die zu dieser Entscheidung geführt haben.\n\n${JSON.stringify(content)}`
          }
        ]
      };
    default:
      return {};
  }
};

// Mock-Antworten für die Entwicklung
const mockAiResponses = {
  analyzeDecision: (decision: Decision): string => {
    // Finde die Option mit dem höchsten Score
    const bestOptionId = decision.finalScore?.[0]?.optionId;
    const bestOption = decision.options.find(o => o.id === bestOptionId);
    
    // Finde das Kriterium mit der höchsten Gewichtung
    const topCriterion = [...decision.criteria].sort((a, b) => b.weight - a.weight)[0];
    
    return `
Ich habe Deine Entscheidungsmatrix zu "${decision.title}" analysiert. "${bestOption?.text}" schneidet als beste Option ab, besonders beim wichtigen Kriterium "${topCriterion?.text}" (Gewichtung ${topCriterion?.weight}/10).

Interessanterweise sehe ich, dass einige Optionen bei bestimmten Kriterien sehr gut, bei anderen aber schwächer abschneiden. Das deutet auf klare Kompromisse hin. Bei Deiner aktuellen Gewichtung ist die Empfehlung klar, aber wenn sich Deine Prioritäten ändern (besonders bei "${topCriterion?.text}"), könnte sich das Ergebnis verschieben.

Für eine noch fundiertere Entscheidung könntest Du überlegen, ob weitere Kriterien wie langfristige Konsequenzen oder Risikofaktoren hinzugefügt werden sollten.
    `;
  },
  
  suggestImprovements: (decision: Decision): string => {
    return `
Hier sind einige Vorschläge zur Verbesserung Deiner Entscheidungsmatrix:

1. **Ausgewogenheit der Kriterien:** Ich sehe, dass Dein am höchsten gewichtetes Kriterium sehr dominant ist. Überlege, ob die Gewichtungen wirklich Deine Prioritäten widerspiegeln.

2. **Fehlende Perspektiven:** Du könntest folgende Kriterien ergänzen:
   - Langfristige vs. kurzfristige Vorteile
   - Risikofaktoren oder Ausfallsicherheit
   - Ökologische/soziale Nachhaltigkeit
   
3. **Subjektivität vs. Objektivität:** Einige Bewertungen scheinen sehr subjektiv zu sein. Kannst Du Daten oder externe Meinungen einbeziehen, um Deine Bewertungen zu validieren?

4. **Sensitivitätsanalyse:** Versuche, die Gewichtungen leicht zu variieren, um zu sehen, wie robust Deine Entscheidung ist.
    `;
  },
  
  generateSummary: (decision: Decision): string => {
    // Finde die Option mit dem höchsten Score
    const bestOptionId = decision.finalScore?.[0]?.optionId;
    const bestOption = decision.options.find(o => o.id === bestOptionId);
    
    // Finde das Kriterium mit der höchsten Gewichtung
    const topCriterion = [...decision.criteria].sort((a, b) => b.weight - a.weight)[0];
    
    return `Bei der Entscheidung "${decision.title}" ist "${bestOption?.text}" mit einem Score von ${decision.finalScore?.[0]?.score.toFixed(2)}/10 die beste Option. Diese Option überzeugt besonders beim Kriterium "${topCriterion?.text}", das mit ${topCriterion?.weight}/10 am höchsten gewichtet wurde.`;
  }
};

// In einer echten Anwendung würde dieser Service die OpenAI oder Anthropic API anrufen
export const aiService = {
  analyzeDecision: async (decision: Decision): Promise<string> => {
    try {
      // In einer echten Anwendung:
      // const prompt = generateAiPrompt('analyzeDecision', decision);
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     ...prompt,
      //     temperature: 0.7
      //   })
      // });
      // const data = await response.json();
      // return data.choices[0].message.content;
      
      // Für die Entwicklung verwenden wir die Mock-Funktion
      await simulateApiDelay();
      return mockAiResponses.analyzeDecision(decision);
    } catch (error) {
      console.error('Fehler bei der KI-Analyse:', error);
      throw new Error('Fehler bei der KI-Analyse der Entscheidung');
    }
  },
  
  suggestImprovements: async (decision: Decision): Promise<string> => {
    try {
      // In einer echten Anwendung würde hier der API-Call erfolgen
      await simulateApiDelay();
      return mockAiResponses.suggestImprovements(decision);
    } catch (error) {
      console.error('Fehler bei den KI-Verbesserungsvorschlägen:', error);
      throw new Error('Fehler bei den KI-Verbesserungsvorschlägen');
    }
  },
  
  generateSummary: async (decision: Decision): Promise<string> => {
    try {
      // In einer echten Anwendung würde hier der API-Call erfolgen
      await simulateApiDelay();
      return mockAiResponses.generateSummary(decision);
    } catch (error) {
      console.error('Fehler bei der KI-Zusammenfassung:', error);
      throw new Error('Fehler bei der KI-Zusammenfassung');
    }
  },
};