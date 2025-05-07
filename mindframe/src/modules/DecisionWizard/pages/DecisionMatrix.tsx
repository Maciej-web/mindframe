// src/modules/DecisionWizard/pages/DecisionMatrix.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchDecision,
  updateScore,
  evaluateDecision,
  selectCurrentDecision,
  selectDecisionStatus,
  selectDecisionError,
} from '../store/decisionWizardSlice';
import type { Score } from '../types';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import ScoreMatrix from '../components/ScoreMatrix';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DecisionMatrix: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentDecision = useAppSelector(selectCurrentDecision);
  const status = useAppSelector(selectDecisionStatus);
  const error = useAppSelector(selectDecisionError);
  const isLoading = status === 'loading';
  
  const [matrixCompleted, setMatrixCompleted] = useState(false);
  
  // Lade die Entscheidung beim ersten Rendering
  useEffect(() => {
    if (id) {
      dispatch(fetchDecision(id));
    }
  }, [id, dispatch]);
  
  // Berechne, ob die Matrix vollständig ausgefüllt ist
  useEffect(() => {
    if (currentDecision) {
      const { options, criteria, scores } = currentDecision;
      
      // Die Matrix ist vollständig, wenn für jede Kombination aus Option und Kriterium ein Score existiert
      const requiredScores = options.length * criteria.length;
      const filledScores = scores.length;
      
      // Setze matrixCompleted auf true, wenn alle Scores vorhanden sind
      setMatrixCompleted(filledScores >= requiredScores);
    }
  }, [currentDecision]);
  
  // Handler für das Aktualisieren eines Scores
  const handleUpdateScore = (score: Score) => {
    if (id) {
      dispatch(updateScore({ decisionId: id, score }));
    }
  };
  
  // Handler für "Zurück"
  const handleBack = () => {
    if (id) {
      navigate(`/decision-wizard/${id}/edit`);
    }
  };
  
  // Handler für "Entscheidung auswerten"
  const handleEvaluate = async () => {
    if (id && id !== 'new' && currentDecision) {
      try {
        const result = await dispatch(evaluateDecision(id));
        
        if (evaluateDecision.fulfilled.match(result)) {
          // Navigiere zur Ergebnisseite
          navigate(`/decision-wizard/${id}/result`);
        }
      } catch (error) {
        console.error("Fehler beim Auswerten der Entscheidung:", error);
        // Zeige einen Fehlerdialog an
      }
    } else {
      console.error("Keine gültige ID für die Entscheidung gefunden");
      // Zeige einen Fehlerdialog an oder leite zur Entscheidungsliste um
      navigate('/decision-wizard');
    }
  };
  
  if (!currentDecision && !isLoading) {
    // Entscheidung nicht gefunden
    return (
      <MainLayout title="Entscheidungsmatrix" subtitle="Bewerte deine Optionen">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 text-center">
          <h2 className="text-xl font-semibold text-navy-800 mb-4">
            Entscheidung nicht gefunden
          </h2>
          <p className="text-navy-600 mb-6">
            Die angeforderte Entscheidung konnte nicht gefunden werden.
          </p>
          <Button onClick={() => navigate('/decision-wizard')}>
            Zurück zur Übersicht
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout
      title="Entscheidungsmatrix"
      subtitle={currentDecision ? currentDecision.title : 'Bewerte deine Optionen'}
    >
      {/* Anfrage lädt */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Fehleranzeige */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>Fehler: {error}</p>
        </div>
      )}
      
      {/* Hauptinhalt */}
      {currentDecision && (
        <div className="space-y-8">
          {/* Anleitung */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold text-navy-800 mb-4">
              Bewerte deine Optionen
            </h2>
            <p className="text-navy-600 mb-4">
              Bewerte jede Option für jedes Kriterium auf einer Skala von 1 bis 10.
              Die gewichteten Scores werden automatisch berechnet.
            </p>
            
            {/* Überprüfe, ob genügend Optionen und Kriterien vorhanden sind */}
            {(currentDecision.options.length < 2 || currentDecision.criteria.length < 1) ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4">
                <p className="font-medium">Unvollständige Entscheidungskriterien</p>
                <p className="mt-1">
                  {currentDecision.options.length < 2 && 
                    "Du brauchst mindestens zwei Optionen für eine aussagekräftige Entscheidungsmatrix. "}
                  {currentDecision.criteria.length < 1 && 
                    "Du brauchst mindestens ein Kriterium für eine aussagekräftige Entscheidungsmatrix."}
                </p>
                <Button 
                  onClick={handleBack} 
                  variant="outline" 
                  className="mt-3"
                >
                  Zurück zur Bearbeitung
                </Button>
              </div>
            ) : (
              <ScoreMatrix
                decision={currentDecision}
                onUpdateScore={handleUpdateScore}
                isLoading={isLoading}
              />
            )}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              startIcon={<ArrowLeft size={18} />}
              disabled={isLoading}
            >
              Zurück
            </Button>
            
            <Button
              onClick={handleEvaluate}
              disabled={isLoading || !matrixCompleted || currentDecision.options.length < 2 || currentDecision.criteria.length < 1}
              endIcon={<ArrowRight size={18} />}
            >
              Entscheidung auswerten
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DecisionMatrix;