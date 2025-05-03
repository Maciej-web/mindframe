// src/modules/BrainOrganizer/services/exportService.ts

import type { Cluster, Thought, BrainDump } from '../types';

export const exportService = {
  exportAsMarkdown: (brainDump: BrainDump, clusters: Cluster[], thoughts: Thought[], summary: string): string => {
    let markdown = `# Brain Dump: ${brainDump.title || new Date(brainDump.createdAt).toLocaleString()}\n\n`;
    
    if (summary) {
      markdown += `## Summary\n\n${summary}\n\n`;
    }
    
    // Group thoughts by cluster
    const thoughtsByCluster: Record<string, Thought[]> = {};
    const uncategorizedThoughts: Thought[] = [];
    
    thoughts.forEach(thought => {
      if (thought.clusterId) {
        if (!thoughtsByCluster[thought.clusterId]) {
          thoughtsByCluster[thought.clusterId] = [];
        }
        const clusterThoughts = thoughtsByCluster[thought.clusterId];
        if (clusterThoughts) {
          clusterThoughts.push(thought);
        }
      } else {
        uncategorizedThoughts.push(thought);
      }
    });
    
    // Add clusters and their thoughts
    markdown += `## Clusters\n\n`;
    
    clusters.forEach(cluster => {
      markdown += `### ${cluster.name}\n\n`;
      
      if (cluster.description) {
        markdown += `${cluster.description}\n\n`;
      }
      
      const clusterThoughts = thoughtsByCluster[cluster.id] || [];
      
      if (clusterThoughts.length > 0) {
        clusterThoughts.forEach(thought => {
          markdown += `- ${thought.content}\n`;
        });
        markdown += '\n';
      } else {
        markdown += `No thoughts in this cluster.\n\n`;
      }
    });
    
    // Add uncategorized thoughts
    if (uncategorizedThoughts.length > 0) {
      markdown += `### Uncategorized\n\n`;
      
      uncategorizedThoughts.forEach(thought => {
        markdown += `- ${thought.content}\n`;
      });
      markdown += '\n';
    }
    
    // Add metadata
    markdown += `## Metadata\n\n`;
    markdown += `- Created: ${new Date(brainDump.createdAt).toLocaleString()}\n`;
    markdown += `- Last Updated: ${new Date(brainDump.updatedAt).toLocaleString()}\n`;
    
    return markdown;
  },
  
  downloadAsMarkdown: (brainDump: BrainDump, clusters: Cluster[], thoughts: Thought[], summary: string): void => {
    const markdown = exportService.exportAsMarkdown(brainDump, clusters, thoughts, summary);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `brain-dump-${brainDump.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  
  exportAsPdf: async (brainDump: BrainDump, clusters: Cluster[], thoughts: Thought[], summary: string): Promise<void> => {
    // In einer echten Anwendung würden wir hier jsPDF oder eine ähnliche Bibliothek verwenden
    // Da dies jedoch über den Scope dieses Beispiels hinausgeht, zeigen wir nur die Markdown-Variante
    alert('PDF export would be implemented here in a real application.');
    exportService.downloadAsMarkdown(brainDump, clusters, thoughts, summary);
  },
};