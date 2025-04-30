import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const [counter, setCounter] = useState(0);

  // Module-Daten
  const modules = [
    {
      id: 'brain-organizer',
      title: 'Brain Organizer',
      description: 'Ordne deine Gedanken und Ideen nach Kategorien, Meistere deine Ziele mit Klarheit und Struktur',
      color: 'primary',
      path: '/brain-organizer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
        </svg>
      ),
    },
    {
      id: 'decision-wizard',
      title: 'Decision Wizard',
      description: 'Finde die besten Entscheidungen. Bewertungsoptionen und Kriterien auswählen',
      color: 'purple',
      path: '/decision-wizard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'focus-mapper',
      title: 'Focus Mapper',
      description: 'Bleibe konzentriert auf das Wesentliche. Erstelle visuelle Karten deiner Prioritäten',
      color: 'pink',
      path: '/focus-mapper',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'reflexionslogbuch',
      title: 'Reflexionslogbuch',
      description: 'Halte deine Gedanken und Erkenntnisse fest. Erkenne Muster in deinem Denken und Handeln',
      color: 'blue',
      path: '/reflexionslogbuch',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Nutze unsere Module, um Gedanken zu organisieren, Entscheidungen zu treffen und Ziele zu erreichen"
    >
      {/* Hero-Bereich */}
      <div className="mb-8 bg-white p-6 rounded-card shadow-card border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-display font-bold text-navy-800 mb-2">
              Willkommen bei <span className="text-primary">MindFrame</span>
            </h2>
            <p className="text-navy-600 mb-4">
              Eine App für mentale Klarheit und Entscheidungsfindung. Nutze unsere Module für bessere Produktivität und Fokus.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCounter(counter + 1)}
              >
                Mehr erfahren
              </Button>
            </div>
          </div>
          
          {/* Statistiken */}
          <div className="flex space-x-4 md:space-x-6">
            <div className="bg-gray-50 rounded-lg p-4 min-w-[100px] text-center">
              <p className="text-primary text-2xl font-bold">{counter}</p>
              <p className="text-navy-600 text-sm">Projekte</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 min-w-[100px] text-center">
              <p className="text-accent-purple text-2xl font-bold">12</p>
              <p className="text-navy-600 text-sm">Aufgaben</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 min-w-[100px] text-center">
              <p className="text-accent-pink text-2xl font-bold">3</p>
              <p className="text-navy-600 text-sm">Entscheidungen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module-Karten */}
      <h2 className="text-xl font-semibold text-navy-800 mb-6">Module</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            color={module.color}
            action={
              <Link to={module.path} className="block w-full">
                <Button 
                  variant="outline"
                  fullWidth
                >
                  Starten
                </Button>
              </Link>
            }
          />
        ))}
      </div>
      
      {/* Neueste Aktivitäten */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-navy-800 mb-6">Neueste Aktivitäten</h2>
        <div className="bg-white rounded-card p-6 shadow-card">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-navy-900 font-medium">
                    {item === 1 ? 'Neue Entscheidungsmatrix erstellt' : item === 2 ? 'Brain Dump durchgeführt' : 'Fokus-Karte aktualisiert'}
                  </p>
                  <p className="text-navy-500 text-sm">
                    {item === 1 ? 'in Decision Wizard' : item === 2 ? 'in Brain Organizer' : 'in Focus Mapper'}
                  </p>
                </div>
                <span className="text-navy-400 text-sm">
                  {item === 1 ? 'vor 10 Min.' : item === 2 ? 'vor 2 Std.' : 'Gestern'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;