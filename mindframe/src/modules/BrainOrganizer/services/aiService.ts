// src/modules/BrainOrganizer/services/aiService.ts (detaillierte Version)
import { v4 as uuidv4 } from 'uuid';
import type { Thought, Cluster } from '../types';

// Simuliere eine Verzögerung für die API-Anfragen
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

// Mögliche AI-Prompt-Struktur für die OpenAI API
const generateAiPrompt = (type: string, content: any) => {
  switch (type) {
    case 'splitThoughts':
      return {
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps to organize thoughts. Your task is to split a brain dump into individual thoughts or ideas.'
          },
          {
            role: 'user',
            content: `Split the following brain dump into individual thoughts or ideas. Return the result as a JSON array of strings, where each string is a complete thought or idea:\n\n${content}`
          }
        ]
      };
    case 'clusterThoughts':
      return {
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps to organize thoughts. Your task is to analyze thoughts and group them into meaningful clusters.'
          },
          {
            role: 'user',
            content: `Analyze the following thoughts and group them into meaningful clusters. For each cluster, provide a name and description. Return the result as a JSON object with "clusters" array containing objects with "name" and "description" fields, and a "thoughtAssignments" object mapping thought indices to cluster indices:\n\n${JSON.stringify(content)}`
          }
        ]
      };
    case 'generateSummary':
      return {
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps to summarize collections of thoughts. Your task is to create a concise summary of a brain dump.'
          },
          {
            role: 'user',
            content: `Create a concise summary (2-3 sentences) of the following collection of thoughts, highlighting the main themes and insights:\n\n${JSON.stringify(content)}`
          }
        ]
      };
    default:
      return {};
  }
};

// Die Mock-API-Antworten für die Entwicklung
const mockAiResponses = {
  splitThoughts: (content: string) => {
    // Einfache Aufteilung nach Satzzeichen für das Mock
    const thoughts = content
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    return thoughts;
  },
  
  clusterThoughts: (thoughts: Thought[]) => {
    // Einfaches Clustering für das Mock
    const mockClusters = [
      {
        id: uuidv4(),
        name: 'Work Tasks',
        description: 'Professional responsibilities and action items',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Creative Ideas',
        description: 'New concepts and innovative thinking',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Personal Growth',
        description: 'Self-improvement goals and reflections',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    // Zuweisen von Thoughts zu Clustern basierend auf Schlüsselwörtern
    const workKeywords = ['meeting', 'deadline', 'project', 'email', 'report', 'task', 'work'];
    const creativeKeywords = ['idea', 'creative', 'design', 'concept', 'innovation', 'imagine'];
    const personalKeywords = ['goal', 'improve', 'learn', 'personal', 'growth', 'health', 'exercise'];
    
    thoughts.forEach(thought => {
      const content = thought.content.toLowerCase();
      
      let workCluster = mockClusters[0];
      let creativeCluster = mockClusters[1];
      let personalCluster = mockClusters[2];
      
      if (mockClusters.length >= 3) {
        thoughts.forEach((thought) => {
          const content = thought.content.toLowerCase();
      
          if (workKeywords.some((keyword) => content.includes(keyword))) {
            thought.clusterId = workCluster!.id;
          } else if (creativeKeywords.some((keyword) => content.includes(keyword))) {
            thought.clusterId = creativeCluster!.id;
          } else if (personalKeywords.some((keyword) => content.includes(keyword))) {
            thought.clusterId = personalCluster!.id;
          }
        });
      }
      
      
      // Wenn kein Schlüsselwort gefunden wurde, bleibt clusterId null (unkategorisiert)
    });
    
    return mockClusters;
  },
  
  generateSummary: (brainDumpId: string) => {
    return "This brain dump contains a mix of work tasks, creative ideas, and personal growth goals. The main themes include project planning, innovative concepts for future implementation, and self-improvement strategies.";
  }
};

// In einer echten Anwendung würde dieser Service die OpenAI API anrufen
export const aiService = {
  splitIntoThoughts: async (content: string): Promise<Thought[]> => {
    try {
      // In einer echten Anwendung:
      // const prompt = generateAiPrompt('splitThoughts', content);
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     ...prompt,
      //     temperature: 0.3
      //   })
      // });
      // const data = await response.json();
      // const thoughtsArray = JSON.parse(data.choices[0].message.content);
      
      // Für die Entwicklung verwenden wir die Mock-Funktion
      await simulateApiDelay();
      const thoughtsArray = mockAiResponses.splitThoughts(content);
      
      return thoughtsArray.map(text => ({
        id: uuidv4(),
        content: text,
        originalContent: text,
        clusterId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error splitting thoughts:', error);
      throw new Error('Failed to process brain dump');
    }
  },
  
  clusterThoughts: async (thoughts: Thought[]): Promise<Cluster[]> => {
    try {
      // In einer echten Anwendung:
      // const prompt = generateAiPrompt('clusterThoughts', thoughts);
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     ...prompt,
      //     temperature: 0.3
      //   })
      // });
      // const data = await response.json();
      // const result = JSON.parse(data.choices[0].message.content);
      // const { clusters, thoughtAssignments } = result;
      
      // Für die Entwicklung verwenden wir die Mock-Funktion
      await simulateApiDelay();
      const clusters = mockAiResponses.clusterThoughts(thoughts);
      
      return clusters;
    } catch (error) {
      console.error('Error clustering thoughts:', error);
      throw new Error('Failed to cluster thoughts');
    }
  },
  
  generateSummary: async (brainDumpId: string): Promise<string> => {
    try {
      // In einer echten Anwendung:
      // const thoughts = ... // Lade Thoughts aus dem Store oder der API
      // const prompt = generateAiPrompt('generateSummary', thoughts);
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     ...prompt,
      //     temperature: 0.5
      //   })
      // });
      // const data = await response.json();
      // return data.choices[0].message.content;
      
      // Für die Entwicklung verwenden wir die Mock-Funktion
      await simulateApiDelay();
      return mockAiResponses.generateSummary(brainDumpId);
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary');
    }
  },
  
  // Weitere AI-Funktionen könnten hier implementiert werden
};