// src/modules/DecisionWizard/components/OptionInput.tsx

import React, { useState } from 'react';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { Option } from '../types';

interface OptionInputProps {
  options: Option[];
  onAddOption: (option: Omit<Option, 'id'>) => void;
  onRemoveOption: (id: string) => void;
  onReorderOptions?: (reorderedOptions: Option[]) => void;
  isLoading?: boolean;
}

const OptionInput: React.FC<OptionInputProps> = ({
  options,
  onAddOption,
  onRemoveOption,
  onReorderOptions,
  isLoading = false,
}) => {
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddOption = () => {
    // Trim whitespace
    const trimmedOption = newOption.trim();
    
    // Validate
    if (!trimmedOption) {
      setError('Bitte gib eine Option ein');
      return;
    }
    
    // Check for duplicates
    if (options.some((option) => option.text.toLowerCase() === trimmedOption.toLowerCase())) {
      setError('Diese Option existiert bereits');
      return;
    }
    
    // Add the option
    onAddOption({ text: trimmedOption });
    setNewOption('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        {/* Liste der bestehenden Optionen */}
        {options.length > 0 && (
          <ul className="space-y-2 mb-4">
            {options.map((option) => (
              <li key={option.id} className="flex items-center p-2 bg-white rounded-md shadow-sm border border-neutral-200 group">
                <div className="flex-shrink-0 mr-2 text-neutral-400 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={18} />
                </div>
                <span className="flex-grow text-navy-800">{option.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveOption(option.id)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isLoading}
                  aria-label={`Option "${option.text}" entfernen`}
                >
                  <Trash2 size={18} />
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Eingabefeld für neue Optionen */}
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Input
              value={newOption}
              onChange={(e) => {
                setNewOption(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Neue Option eingeben"
              error={error || undefined}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleAddOption}
            disabled={isLoading || !newOption.trim()}
            startIcon={<PlusCircle size={18} />}
          >
            Hinzufügen
          </Button>
        </div>
      </div>

      {/* Hilfetext zur Nutzung */}
      {options.length === 0 && (
        <p className="text-sm text-navy-600 mt-2">
          Füge Optionen hinzu, zwischen denen du dich entscheiden möchtest.
          Beispiel: "Neues Auto kaufen", "Gebrauchtes Auto kaufen", "Car-Sharing nutzen"
        </p>
      )}
    </div>
  );
};

export default OptionInput;