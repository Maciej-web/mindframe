// src/modules/DecisionWizard/pages/DecisionList.tsx

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchDecisions,
  deleteDecision,
  selectAllDecisions,
  selectDecisionStatus,
  selectDecisionError,
} from '../store/decisionWizardSlice';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Plus, ArrowRight, Calendar, BarChart, Trash2 } from 'lucide-react';
import type { Decision } from '../types';

const DecisionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const decisions = useAppSelector(selectAllDecisions);
  const status = useAppSelector(selectDecisionStatus);
  const error = useAppSelector(selectDecisionError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDecisions());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (window.confirm('Möchtest du diese Entscheidung wirklich löschen?')) {
      dispatch(deleteDecision(id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderDecisionStatus = (decision: any) => {
    if (decision.finalScore && decision.recommendation) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Abgeschlossen
        </span>
      );
    }
    
    if (decision.criteria.length > 0 && decision.options.length > 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          In Bearbeitung
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Neu
      </span>
    );
  };

  return (
    <MainLayout title="Entscheidungen" subtitle="Verwalte deine Entscheidungsprozesse">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-navy-900">Deine Entscheidungen</h2>
        <Button
          startIcon={<Plus size={18} />}
          onClick={() => navigate('/decision-wizard/new')}
        >
          Neue Entscheidung
        </Button>
      </div>

      {status === 'loading' && decisions.length === 0 && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>Fehler beim Laden der Entscheidungen: {error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(fetchDecisions())}
            className="mt-2"
          >
            Erneut versuchen
          </Button>
        </div>
      )}

      {!error && decisions.length === 0 && status !== 'loading' && (
        <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-navy-800 mb-2">Keine Entscheidungen gefunden</h3>
          <p className="text-navy-600 mb-6">
            Starte deinen ersten strukturierten Entscheidungsprozess, um besser informierte Entscheidungen zu treffen.
          </p>
          <Button
            startIcon={<Plus size={18} />}
            onClick={() => navigate('/decision-wizard/new')}
          >
            Erste Entscheidung anlegen
          </Button>
        </div>
      )}

      {decisions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decisions.map((decision: Decision) => (
            <Link
              to={`/decision-wizard/${decision.id}/edit`}
              key={decision.id}
              className="block transition-transform hover:-translate-y-1"
            >
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-navy-900 line-clamp-2">{decision.title}</h3>
                    <div className="ml-2 flex-shrink-0">
                      {renderDecisionStatus(decision)}
                    </div>
                  </div>
                  
                  {decision.description && (
                    <p className="text-navy-700 mb-4 line-clamp-2">{decision.description}</p>
                  )}
                  
                  <div className="space-y-2 text-sm text-navy-600">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Optionen:</span>
                      <span>{decision.options.length}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Kriterien:</span>
                      <span>{decision.criteria.length}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-navy-500" />
                      <span>Erstellt am {formatDate(decision.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 p-4 flex justify-between items-center bg-neutral-50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDelete(decision.id, e)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    startIcon={<Trash2 size={16} />}
                  >
                    Löschen
                  </Button>
                  
                  {decision.finalScore ? (
                    <Button
                      variant="primary"
                      size="sm"
                      endIcon={<ArrowRight size={16} />}
                    >
                      Ergebnis ansehen
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      endIcon={<BarChart size={16} />}
                    >
                      Weiter bearbeiten
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default DecisionList;