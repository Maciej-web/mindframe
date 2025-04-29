import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="card mb-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Willkommen bei MindFrame</h1>
          <p className="text-neutral-600 mb-4">
            Deine App für mentale Klarheit und bessere Entscheidungen. Nutze unsere Module,
            um Gedanken zu organisieren, Entscheidungen zu treffen und Ziele zu erreichen.
          </p>
          <div className="flex gap-3">
            <Button 
              variant="primary" 
              onClick={() => setCount((count) => count + 1)}
            >
              Zähler: {count}
            </Button>
            <Button variant="outline">Mehr erfahren</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Brain Organizer Card */}
          <div className="card flex flex-col">
            <h2 className="text-lg font-bold mb-2">Brain Organizer</h2>
            <p className="text-sm text-neutral-600 flex-1 mb-4">
              Notiere deine Gedanken und lasse KI-gestützte Analyse dir helfen, 
              Muster und Zusammenhänge zu erkennen.
            </p>
            <Button variant="outline" size="sm" className="mt-auto">Starten</Button>
          </div>

          {/* Decision Wizard Card */}
          <div className="card flex flex-col">
            <h2 className="text-lg font-bold mb-2">Decision Wizard</h2>
            <p className="text-sm text-neutral-600 flex-1 mb-4">
              Triff fundierte Entscheidungen durch systematische Bewertung 
              von Optionen und Kriterien.
            </p>
            <Button variant="outline" size="sm" className="mt-auto">Starten</Button>
          </div>

          {/* Focus Mapper Card */}
          <div className="card flex flex-col">
            <h2 className="text-lg font-bold mb-2">Focus Mapper</h2>
            <p className="text-sm text-neutral-600 flex-1 mb-4">
              Definiere Ziele und plane Meilensteine mit intelligenter Aufgabenplanung
              für maximale Produktivität.
            </p>
            <Button variant="outline" size="sm" className="mt-auto">Starten</Button>
          </div>

          {/* Reflexionslogbuch Card */}
          <div className="card flex flex-col">
            <h2 className="text-lg font-bold mb-2">Reflexionslogbuch</h2>
            <p className="text-sm text-neutral-600 flex-1 mb-4">
              Halte Erfahrungen und Gedanken systematisch fest, um aus 
              Vergangenem zu lernen und zu wachsen.
            </p>
            <Button variant="outline" size="sm" className="mt-auto">Starten</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;