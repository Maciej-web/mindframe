// src/modules/DecisionWizard/components/ScoreMatrix.tsx

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Decision, Option, Criterion, Score } from '../types';

interface ScoreMatrixProps {
  decision: Decision;
  onUpdateScore: (score: Score) => void;
  isLoading?: boolean;
}

const ScoreMatrix: React.FC<ScoreMatrixProps> = ({
  decision,
  onUpdateScore,
  isLoading = false,
}) => {
  const { options, criteria, scores } = decision;

  // Hilfsfunktion, um den Score für eine Option und ein Kriterium zu finden
  const getScore = (optionId: string, criterionId: string): number => {
    const score = scores.find(
      (s) => s.optionId === optionId && s.criterionId === criterionId
    );
    return score ? score.value : 5; // Default-Wert: 5 (mittel)
  };

  // Hilfsfunktion zur Berechnung des gewichteten Scores für Option/Kriterium
  const getWeightedScore = (optionId: string, criterionId: string): number => {
    const score = getScore(optionId, criterionId);
    const criterion = criteria.find((c) => c.id === criterionId);
    if (!criterion) return 0;
    
    // Gewichteter Wert (Score * (Gewichtung/10))
    return score * (criterion.weight / 10);
  };

  // Hilfsfunktion zur Berechnung des Gesamtscores für eine Option
  const calculateTotalScore = (optionId: string): number => {
    if (criteria.length === 0) return 0;
    
    const totalWeightedScore = criteria.reduce((sum, criterion) => {
      return sum + getWeightedScore(optionId, criterion.id);
    }, 0);
    
    // Durchschnitt der gewichteten Scores
    return totalWeightedScore / criteria.length;
  };

  // Hilfsfunktion zur Score-Inkrementierung/Dekrementierung
  const adjustScore = (optionId: string, criterionId: string, delta: number) => {
    const currentScore = getScore(optionId, criterionId);
    const newScore = Math.max(1, Math.min(10, currentScore + delta)); // Begrenzen auf 1-10
    
    if (newScore !== currentScore) {
      onUpdateScore({
        optionId,
        criterionId,
        value: newScore,
      });
    }
  };

  // Style-Hilfsfunktion für Score-Zellen
  const getScoreCellStyle = (score: number) => {
    // Farbskala von Rot (1) über Gelb (5) bis Grün (10)
    if (score <= 3) return 'bg-red-50 text-red-900';
    if (score <= 5) return 'bg-amber-50 text-amber-900';
    if (score <= 7) return 'bg-lime-50 text-lime-900';
    return 'bg-green-50 text-green-900';
  };

  // Stil für Gesamtscore-Zellen
  const getTotalScoreCellStyle = (score: number) => {
    // Ähnliche Farbskala, aber intensiver
    if (score <= 3) return 'bg-red-100 text-red-900 font-medium';
    if (score <= 5) return 'bg-amber-100 text-amber-900 font-medium';
    if (score <= 7) return 'bg-lime-100 text-lime-900 font-medium';
    return 'bg-green-100 text-green-900 font-medium';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 border border-neutral-200 rounded-md">
        <thead className="bg-neutral-50">
          <tr>
            {/* Leere Ecke oben links */}
            <th className="px-4 py-3 text-left text-sm font-medium text-navy-700 border-r border-b border-neutral-200">
              Kriterien ↓ / Optionen →
            </th>
            
            {/* Optionsnamen als Spaltenüberschriften */}
            {options.map((option) => (
              <th 
                key={option.id} 
                className="px-4 py-3 text-center text-sm font-medium text-navy-700 border-r border-b border-neutral-200"
              >
                {option.text}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-neutral-200">
          {/* Zeilen für jedes Kriterium */}
          {criteria.map((criterion) => (
            <tr key={criterion.id} className="hover:bg-neutral-50">
              {/* Kriterienspalte mit Gewichtung */}
              <td className="px-4 py-2 text-sm text-navy-800 border-r border-neutral-200">
                <div className="font-medium">{criterion.text}</div>
                <div className="text-xs text-navy-500">
                  Gewichtung: {criterion.weight}/10
                </div>
              </td>
              
              {/* Bewertungszellen für jede Option */}
              {options.map((option) => {
                const score = getScore(option.id, criterion.id);
                
                return (
                  <td 
                    key={`${option.id}-${criterion.id}`} 
                    className={`px-4 py-2 text-sm border-r border-neutral-200 ${getScoreCellStyle(score)}`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Score-Wert */}
                      <span className="font-medium">{score}/10</span>
                      
                      {/* Buttons zum Inkrementieren/Dekrementieren */}
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => adjustScore(option.id, criterion.id, 1)}
                          disabled={isLoading || score >= 10}
                          className="p-0.5 text-navy-600 hover:text-navy-900 disabled:text-neutral-300"
                          aria-label={`Bewertung für ${option.text} bei ${criterion.text} erhöhen`}
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustScore(option.id, criterion.id, -1)}
                          disabled={isLoading || score <= 1}
                          className="p-0.5 text-navy-600 hover:text-navy-900 disabled:text-neutral-300"
                          aria-label={`Bewertung für ${option.text} bei ${criterion.text} verringern`}
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          
          {/* Zeile für Gesamtscores */}
          <tr className="bg-neutral-50 font-medium">
            <td className="px-4 py-3 text-sm text-navy-800 border-r border-t border-neutral-200">
              Gesamtbewertung
            </td>
            
            {options.map((option) => {
              const totalScore = calculateTotalScore(option.id);
              const formattedScore = totalScore.toFixed(2);
              
              return (
                <td 
                  key={`total-${option.id}`} 
                  className={`px-4 py-3 text-center text-sm border-r border-t border-neutral-200 ${getTotalScoreCellStyle(totalScore)}`}
                >
                  {formattedScore}/10
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      
      {/* Hinweistext unter der Matrix */}
      <p className="text-sm text-navy-600 mt-3">
        Hinweis: Bewerte jede Option für jedes Kriterium mit Werten von 1 (sehr schlecht) bis 10 (hervorragend).
        Die Gesamtbewertung berechnet sich aus dem gewichteten Durchschnitt.
      </p>
    </div>
  );
};

export default ScoreMatrix;