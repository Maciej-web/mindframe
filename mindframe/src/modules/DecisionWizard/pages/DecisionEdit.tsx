// src/modules/DecisionWizard/pages/DecisionEdit.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchDecision,
  createDecision,
  updateDecision,
  addOption,
  addCriterion,
  selectCurrentDecision,
  selectDecisionStatus,
  selectDecisionError,
  clearCurrentDecision,
} from '../store/decisionWizardSlice';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import OptionInput from '../components/OptionInput';
import CriterionInput from '../components/CriterionInput';
import { DecisionWizardStep  } from '../types';
import { ArrowLeft, ArrowRight, Save, Edit3, CheckCircle2 } from 'lucide-react';
import type { Option, Criterion } from '../types';

const DecisionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentDecision = useAppSelector(selectCurrentDecision);
  const status = useAppSelector(selectDecisionStatus);
  const error = useAppSelector(selectDecisionError);
  const isLoading = status === 'loading';
  
  // Formularstatus
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeStep, setActiveStep] = useState<DecisionWizardStep>(DecisionWizardStep.TITLE);
  const [stepCompleted, setStepCompleted] = useState<Record<DecisionWizardStep, boolean>>({
    [DecisionWizardStep.TITLE]: false,
    [DecisionWizardStep.OPTIONS]: false,
    [DecisionWizardStep.CRITERIA]: false,
    [DecisionWizardStep.MATRIX]: false,
    [DecisionWizardStep.RESULT]: false,
  });
  
  // Reset bei neuer Entscheidung
  useEffect(() => {
    if (isNew) {
      dispatch(clearCurrentDecision());
    }
  }, [isNew, dispatch]);
  
  // Effekt zum Laden einer bestehenden Entscheidung
  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchDecision(id))
        .unwrap()
        .catch(error => {
          console.error("Fehler beim Laden der Entscheidung:", error);
        });
    }
  }, [isNew, id, dispatch]);
  
  // Effekt zum Initialisieren des Formulars mit den Daten der geladenen Entscheidung
  useEffect(() => {
    if (currentDecision) {
      setTitle(currentDecision.title);
      setDescription(currentDecision.description || '');
      
      // Prüfe, welche Schritte abgeschlossen sind
      setStepCompleted({
        [DecisionWizardStep.TITLE]: Boolean(currentDecision.title),
        [DecisionWizardStep.OPTIONS]: currentDecision.options.length > 0,
        [DecisionWizardStep.CRITERIA]: currentDecision.criteria.length > 0,
        [DecisionWizardStep.MATRIX]: currentDecision.scores?.length > 0,
        [DecisionWizardStep.RESULT]: Boolean(currentDecision.finalScore),
      });
      
      // Setze den aktiven Schritt basierend auf dem Fortschritt (nur für bestehende Entscheidungen)
      if (!isNew) {
        if (!currentDecision.options.length) {
          setActiveStep(DecisionWizardStep.OPTIONS);
        } else if (!currentDecision.criteria.length) {
          setActiveStep(DecisionWizardStep.CRITERIA);
        } else if (!currentDecision.scores?.length) {
          navigate(`/decision-wizard/${id}/matrix`);
        } else if (currentDecision.finalScore) {
          navigate(`/decision-wizard/${id}/result`);
        }
      }
    }
  }, [currentDecision, isNew, id, navigate]);
  
  // Handler für das Speichern der Entscheidung
  const handleSaveDecision = async () => {
    try {
      if (isNew) {
        const result = await dispatch(createDecision({ title, description })).unwrap();
        // Navigiere zur Options-Seite mit der neuen ID
        navigate(`/decision-wizard/${result.id}/edit`);
        setActiveStep(DecisionWizardStep.OPTIONS);
      } else if (id) {
        await dispatch(updateDecision({ id, title, description })).unwrap();
        setActiveStep(DecisionWizardStep.OPTIONS);
      }
      
      setStepCompleted({
        ...stepCompleted,
        [DecisionWizardStep.TITLE]: true,
      });
    } catch (error) {
      console.error("Fehler beim Speichern der Entscheidung:", error);
    }
  };
  
  // Handler für das Hinzufügen einer Option
  const handleAddOption = (option: Omit<Option, 'id'>) => {
    if (!isNew && id) {
      dispatch(addOption({ decisionId: id, option }));
    }
  };
  
  // Handler für das Entfernen einer Option
  const handleRemoveOption = (optionId: string) => {
    if (!isNew && id && currentDecision) {
      dispatch(
        updateDecision({
          id,
          options: currentDecision.options.filter((o: Option) => o.id !== optionId),
        })
      );
    }
  };
  
  // Handler für das Hinzufügen eines Kriteriums
  const handleAddCriterion = (criterion: Omit<Criterion, 'id'>) => {
    if (!isNew && id) {
      dispatch(addCriterion({ decisionId: id, criterion }));
    }
  };
  
  // Handler für das Entfernen eines Kriteriums
  const handleRemoveCriterion = (criterionId: string) => {
    if (!isNew && id && currentDecision) {
      dispatch(
        updateDecision({
          id,
          criteria: currentDecision.criteria.filter((c: Criterion) => c.id !== criterionId),
        })
      );
    }
  };
  
  // Handler für das Aktualisieren der Gewichtung eines Kriteriums
  const handleUpdateWeight = (criterionId: string, weight: number) => {
    if (!isNew && id && currentDecision) {
      const updatedCriteria = currentDecision.criteria.map((c: Criterion) =>
        c.id === criterionId ? { ...c, weight } : c
      );
      
      dispatch(
        updateDecision({
          id,
          criteria: updatedCriteria,
        })
      );
    }
  };
  
  // Handler für Schritte im Wizard
  const handleNextStep = () => {
    if (activeStep === DecisionWizardStep.TITLE) {
      handleSaveDecision();
    } else if (activeStep === DecisionWizardStep.OPTIONS) {
      setActiveStep(DecisionWizardStep.CRITERIA);
      setStepCompleted({
        ...stepCompleted,
        [DecisionWizardStep.OPTIONS]: true,
      });
    } else if (activeStep === DecisionWizardStep.CRITERIA) {
      setStepCompleted({
        ...stepCompleted,
        [DecisionWizardStep.CRITERIA]: true,
      });
      
      // Navigiere zur Matrix-Seite
      if (id && id !== 'new') {
        navigate(`/decision-wizard/${id}/matrix`);
      }
    }
  };
  
  const handlePrevStep = () => {
    if (activeStep === DecisionWizardStep.OPTIONS) {
      setActiveStep(DecisionWizardStep.TITLE);
    } else if (activeStep === DecisionWizardStep.CRITERIA) {
      setActiveStep(DecisionWizardStep.OPTIONS);
    }
  };
  
  // Hilfsfunktion zum Überprüfen, ob der aktuelle Schritt abgeschlossen werden kann
  const canProceed = () => {
    if (activeStep === DecisionWizardStep.TITLE) {
      return title.trim().length > 0;
    }
    if (activeStep === DecisionWizardStep.OPTIONS) {
      return currentDecision?.options?.length >= 2;
    }
    if (activeStep === DecisionWizardStep.CRITERIA) {
      return currentDecision?.criteria?.length >= 1;
    }
    return false;
  };
  
  // Render-Komponenten für die verschiedenen Schritte
  const renderTitleStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-navy-800 mb-6">
          Was möchtest du entscheiden?
        </h2>
        
        <div className="space-y-6">
          <Input
            label="Titel deiner Entscheidung"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Neues Auto kaufen oder leasen?"
            required
            disabled={isLoading}
          />
          
          <TextArea
            label="Beschreibung (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibe die Entscheidungssituation genauer..."
            rows={4}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
  
  const renderOptionsStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-navy-800 mb-2">
          Welche Optionen hast du?
        </h2>
        <p className="text-navy-600 mb-6">
          Füge alle Optionen hinzu, zwischen denen du dich entscheiden möchtest.
        </p>
        
        <OptionInput
          options={currentDecision?.options || []}
          onAddOption={handleAddOption}
          onRemoveOption={handleRemoveOption}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
  
  const renderCriteriaStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-navy-800 mb-2">
          Welche Kriterien sind für deine Entscheidung wichtig?
        </h2>
        <p className="text-navy-600 mb-6">
          Füge Kriterien hinzu und gewichte sie nach ihrer Wichtigkeit für deine Entscheidung.
        </p>
        
        <CriterionInput
          criteria={currentDecision?.criteria || []}
          onAddCriterion={handleAddCriterion}
          onRemoveCriterion={handleRemoveCriterion}
          onUpdateWeight={handleUpdateWeight}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
  
  // Steppernavigation
  const renderStepper = () => {
    const steps = [
      { key: DecisionWizardStep.TITLE, label: 'Entscheidung' },
      { key: DecisionWizardStep.OPTIONS, label: 'Optionen' },
      { key: DecisionWizardStep.CRITERIA, label: 'Kriterien' },
      { key: DecisionWizardStep.MATRIX, label: 'Bewertung' },
      { key: DecisionWizardStep.RESULT, label: 'Ergebnis' },
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              {/* Verbindungslinie */}
              {index > 0 && (
                <div 
                  className={`flex-grow h-0.5 mx-2 ${
                    stepCompleted[step.key] || activeStep === step.key
                      ? 'bg-primary'
                      : 'bg-neutral-200'
                  }`}
                />
              )}
              
              {/* Schritt-Kreis */}
              <div 
                className={`relative flex flex-col items-center ${
                  index > 0 && index < steps.length - 1 ? 'flex-grow-0' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stepCompleted[step.key]
                      ? 'bg-primary text-white'
                      : activeStep === step.key
                      ? 'bg-primary-light text-navy-900 border border-primary'
                      : 'bg-neutral-100 text-navy-500'
                  }`}
                >
                  {stepCompleted[step.key] ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-1 whitespace-nowrap ${
                    activeStep === step.key
                      ? 'text-navy-900 font-medium'
                      : 'text-navy-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout
      title={isNew ? 'Neue Entscheidung' : title}
      subtitle={isNew ? 'Erstelle eine neue Entscheidung' : 'Bearbeite deine Entscheidung'}
    >
      {/* Stepper */}
      {renderStepper()}
      
      {/* Fehleranzeige */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>Fehler: {error}</p>
        </div>
      )}
      
      {/* Aktiver Schritt */}
      {activeStep === DecisionWizardStep.TITLE && renderTitleStep()}
      {activeStep === DecisionWizardStep.OPTIONS && renderOptionsStep()}
      {activeStep === DecisionWizardStep.CRITERIA && renderCriteriaStep()}
      
      {/* Navigationsbuttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/decision-wizard')}
          startIcon={<ArrowLeft size={18} />}
          disabled={isLoading}
        >
          Zurück zur Übersicht
        </Button>
        
        <div className="space-x-3">
          {activeStep !== DecisionWizardStep.TITLE && (
            <Button
              variant="secondary"
              onClick={handlePrevStep}
              startIcon={<ArrowLeft size={18} />}
              disabled={isLoading}
            >
              Zurück
            </Button>
          )}
          
          <Button
            onClick={handleNextStep}
            disabled={!canProceed() || isLoading}
            endIcon={activeStep === DecisionWizardStep.TITLE ? <Save size={18} /> : <ArrowRight size={18} />}
          >
            {activeStep === DecisionWizardStep.TITLE
              ? isNew
                ? 'Entscheidung erstellen'
                : 'Änderungen speichern'
              : 'Weiter'}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default DecisionEdit;