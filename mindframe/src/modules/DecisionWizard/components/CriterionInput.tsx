// src/modules/DecisionWizard/components/CriterionInput.tsx

import React, { useState } from 'react';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { Criterion } from '../types';

interface CriterionInputProps {
  criteria: Criterion[];
  onAddCriterion: (criterion: Omit<Criterion, 'id'>) => void;
  onRemoveCriterion: (id: string) => void;
  onUpdateWeight: (id: string, weight: number) => void;
  onReorderCriteria?: (reorderedCriteria: Criterion[]) => void;
  isLoading?: boolean;
}

const CriterionInput: React.FC<CriterionInputProps> = ({
  criteria,
  onAddCriterion,
  onRemoveCriterion,
  onUpdateWeight,
  onReorderCriteria,
  isLoading = false,
}) => {
  const [newCriterion, setNewCriterion] = useState('');
  const [newWeight, setNewWeight] = useState<number>(7); // Default weight is 7
  const [error, setError] = useState<string | null>(null);

  const handleAddCriterion = () => {
    // Trim whitespace
    const trimmedCriterion = newCriterion.trim();
    
    // Validate
    if (!trimmedCriterion) {
      setError('Bitte gib ein Kriterium ein');
      return;
    }
    
    // Check for duplicates
    if (criteria.some((criterion) => criterion.text.toLowerCase() === trimmedCriterion.toLowerCase())) {
      setError('Dieses Kriterium existiert bereits');
      return;
    }
    
    // Add the criterion
    onAddCriterion({ 
      text: trimmedCriterion,
      weight: newWeight
    });
    
    setNewCriterion('');
    setError(null);
    // Behalte die letzte Gewichtung bei
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCriterion();
    }
  };

  return (
    <div className="space-y-4">
      {/* Liste der bestehenden Kriterien */}
      {criteria.length > 0 && (
        <ul className="space-y-3 mb-4">
          {criteria.map((criterion) => (
            <li 
              key={criterion.id} 
              className="flex flex-col sm:flex-row sm:items-center p-3 bg-white rounded-md shadow-sm border border-neutral-200 group"
            >
              <div className="flex items-center flex-grow mb-2 sm:mb-0">
                <div className="flex-shrink-0 mr-2 text-neutral-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={18} />
                </div>
                <span className="flex-grow text-navy-800">{criterion.text}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Gewichtungs-Slider */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-navy-600 min-w-[80px]">
                    Gewichtung: {criterion.weight}/10
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={criterion.weight}
                    onChange={(e) => onUpdateWeight(criterion.id, parseInt(e.target.value))}
                    className="w-24 sm:w-32"
                    disabled={isLoading}
                    aria-label={`Gewichtung für Kriterium "${criterion.text}"`}
                  />
                </div>
                
                {/* Löschen-Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveCriterion(criterion.id)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isLoading}
                  aria-label={`Kriterium "${criterion.text}" entfernen`}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Eingabefelder für neue Kriterien */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex-grow">
          <Input
            value={newCriterion}
            onChange={(e) => {
              setNewCriterion(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Neues Kriterium eingeben"
            error={error || undefined}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-navy-600 whitespace-nowrap">
            Gewichtung: {newWeight}/10
          </span>
          <input
            type="range"
            min="1"
            max="10"
            value={newWeight}
            onChange={(e) => setNewWeight(parseInt(e.target.value))}
            className="w-24 sm:w-32"
            disabled={isLoading}
            aria-label="Gewichtung für neues Kriterium"
          />
        </div>
        
        <Button
          onClick={handleAddCriterion}
          disabled={isLoading || !newCriterion.trim()}
          startIcon={<PlusCircle size={18} />}
          className="whitespace-nowrap"
        >
          Hinzufügen
        </Button>
      </div>

      {/* Hilfetext */}
      {criteria.length === 0 && (
        <p className="text-sm text-navy-600 mt-2">
          Füge Kriterien hinzu, die für deine Entscheidung wichtig sind, und gewichte ihre Bedeutung.
          Beispiel: "Kosten" (9/10), "Umweltfreundlichkeit" (7/10), "Bequemlichkeit" (5/10)
        </p>
      )}
    </div>
  );
};

export default CriterionInput;