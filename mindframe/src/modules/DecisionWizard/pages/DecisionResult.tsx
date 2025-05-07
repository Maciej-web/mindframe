// src/modules/DecisionWizard/pages/DecisionResult.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchDecision,
  evaluateDecision,
  selectCurrentDecision,
  selectDecisionStatus,
  selectDecisionError,
} from '../store/decisionWizardSlice';
import { aiService } from '../services/aiService';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { ArrowLeft, Share2, FileText, RefreshCw, Award, CheckCircle, BarChart4 } from 'lucide-react';
import type { Option } from '../types';

const DecisionResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentDecision = useAppSelector(selectCurrentDecision);
  const status = useAppSelector(selectDecisionStatus);
  const error = useAppSelector(selectDecisionError);
  const isLoading = status === 'loading';
  
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  
  // Lade die Entscheidung beim ersten Rendering
  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(fetchDecision(id));
    } else {
        // Leite zur Entscheidungsliste um, da keine gültige ID vorhanden ist
        navigate('/decision-wizard');
      }
  }, [id, dispatch]);
  
  // Wenn noch keine Auswertung existiert, führe sie durch
  useEffect(() => {
    const evaluateIfNeeded = async () => {
      if (currentDecision && !currentDecision.finalScore && id) {
        await dispatch(evaluateDecision(id));
      }
    };
    
    evaluateIfNeeded();
  }, [currentDecision, dispatch, id]);
  
  // Lade die KI-Analyse
  const loadAiAnalysis = async () => {
    if (!currentDecision) return;
    
    setIsLoadingAi(true);
    try {
      const analysis = await aiService.analyzeDecision(currentDecision);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Fehler beim Laden der KI-Analyse:', error);
    } finally {
      setIsLoadingAi(false);
    }
  };
  
  // Lade die KI-Verbesserungsvorschläge
  const loadAiSuggestions = async () => {
    if (!currentDecision) return;
    
    setIsLoadingAi(true);
    try {
      const suggestions = await aiService.suggestImprovements(currentDecision);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Fehler beim Laden der KI-Verbesserungsvorschläge:', error);
    } finally {
      setIsLoadingAi(false);
    }
  };
  
  // Lade die KI-Informationen beim ersten Rendering
  useEffect(() => {
    if (currentDecision && currentDecision.finalScore) {
      loadAiAnalysis();
    }
  }, [currentDecision]);
  
  // Hilfsfunktion zum Kopieren der Entscheidungsempfehlung
  const handleShare = () => {
    if (!currentDecision) return;
    
    const shareText = `Entscheidung: ${currentDecision.title}\n\n${currentDecision.recommendation}\n\nErstellt mit MindFrame.`;
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert('Entscheidungsempfehlung in die Zwischenablage kopiert!');
      })
      .catch((err) => {
        console.error('Fehler beim Kopieren in die Zwischenablage:', err);
        alert('Die Entscheidungsempfehlung konnte nicht in die Zwischenablage kopiert werden.');
      });
  };
  
  if (!currentDecision && !isLoading) {
    // Entscheidung nicht gefunden
    return (
      <MainLayout title="Entscheidungsergebnis" subtitle="Auswertung deiner Entscheidung">
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
  
  // Hilfsfunktion zum Rendern der Optionen mit Scores
  const renderOptionsWithScores = () => {
    if (!currentDecision || !currentDecision.finalScore) return null;
    
    // Sortiere die Optionen nach Score (absteigend)
    const sortedScores = [...currentDecision.finalScore].sort((a, b) => b.score - a.score);
    
    return (
      <div className="space-y-4">
        {sortedScores.map((scoredOption, index) => {
          const option = currentDecision.options.find((o: Option) => o.id === scoredOption.optionId);
          if (!option) return null;
          
          // Stil basierend auf Position
          let bgColorClass = 'bg-white';
          let borderColorClass = 'border-neutral-200';
          let iconClass = '';
          
          if (index === 0) {
            bgColorClass = 'bg-green-50';
            borderColorClass = 'border-green-200';
            iconClass = 'text-green-500';
          } else if (index === 1) {
            bgColorClass = 'bg-green-50/50';
            borderColorClass = 'border-green-200/70';
            iconClass = 'text-green-400';
          }
          
          return (
            <div 
              key={option.id} 
              className={`p-4 rounded-lg border ${borderColorClass} ${bgColorClass} flex items-center`}
            >
              <div className={`flex-shrink-0 mr-4 ${iconClass}`}>
                {index === 0 ? (
                  <Award size={24} />
                ) : index === 1 ? (
                  <CheckCircle size={24} />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-navy-600 font-medium">
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="font-medium text-navy-900">
                  {option.text}
                </div>
                <div className="text-sm text-navy-600">
                  {index === 0 && 'Beste Option • '}
                  Score: {scoredOption.score.toFixed(2)}/10
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <MainLayout
      title="Entscheidungsergebnis"
      subtitle={currentDecision ? currentDecision.title : 'Auswertung deiner Entscheidung'}
    >
      {/* Ladeindikator */}
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
      {currentDecision && currentDecision.finalScore && (
        <div className="space-y-8">
          {/* Empfehlung */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 text-primary">
                <Award size={28} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-navy-800 mb-2">
                  Empfehlung
                </h2>
                <p className="text-navy-700">
                  {currentDecision.recommendation}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                variant="secondary"
                onClick={handleShare}
                startIcon={<Share2 size={18} />}
              >
                Teilen
              </Button>
            </div>
          </div>
          
          {/* Ergebnisübersicht */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold text-navy-800 mb-4">
              Ergebnisübersicht
            </h2>
            
            {renderOptionsWithScores()}
            
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/decision-wizard/${id}/matrix`)}
                startIcon={<BarChart4 size={18} />}
              >
                Zur Bewertungsmatrix
              </Button>
            </div>
          </div>
          
          {/* KI-Analyse */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-navy-800 mb-2">
                    Vertiefende Analyse
                  </h2>
                  {isLoadingAi ? (
                    <div className="flex items-center space-x-2 text-navy-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                      <span>Analyse wird generiert...</span>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="prose prose-sm text-navy-700 max-w-none">
                      {aiAnalysis.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-navy-600">
                      Klicke auf "Analyse laden", um eine KI-gestützte Analyse deiner Entscheidung zu erhalten.
                    </p>
                  )}
                </div>
              </div>
              
              {!aiAnalysis && !isLoadingAi && (
                <Button
                  variant="outline"
                  onClick={loadAiAnalysis}
                  className="flex-shrink-0"
                >
                  Analyse laden
                </Button>
              )}
              
              {aiAnalysis && !isLoadingAi && (
                <Button
                  variant="outline"
                  onClick={loadAiAnalysis}
                  startIcon={<RefreshCw size={16} />}
                  className="flex-shrink-0"
                >
                  Neu laden
                </Button>
              )}
            </div>
          </div>
          
          {/* Verbesserungsvorschläge */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-navy-800 mb-2">
                    Verbesserungsvorschläge
                  </h2>
                  {isLoadingAi ? (
                    <div className="flex items-center space-x-2 text-navy-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                      <span>Vorschläge werden generiert...</span>
                    </div>
                  ) : aiSuggestions ? (
                    <div className="prose prose-sm text-navy-700 max-w-none">
                      {aiSuggestions.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-navy-600">
                      Klicke auf "Vorschläge laden", um KI-generierte Verbesserungsvorschläge für deine Entscheidungsmatrix zu erhalten.
                    </p>
                  )}
                </div>
              </div>
              
              {!aiSuggestions && !isLoadingAi && (
                <Button
                  variant="outline"
                  onClick={loadAiSuggestions}
                  className="flex-shrink-0"
                >
                  Vorschläge laden
                </Button>
              )}
              
              {aiSuggestions && !isLoadingAi && (
                <Button
                  variant="outline"
                  onClick={loadAiSuggestions}
                  startIcon={<RefreshCw size={16} />}
                  className="flex-shrink-0"
                >
                  Neu laden
                </Button>
              )}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/decision-wizard')}
              startIcon={<ArrowLeft size={18} />}
            >
              Zurück zur Übersicht
            </Button>
            
            <Button
              onClick={() => navigate(`/decision-wizard/new`)}
              startIcon={<FileText size={18} />}
            >
              Neue Entscheidung
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DecisionResult;