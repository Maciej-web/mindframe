// src/components/PricingSection.jsx
import React from 'react';

const tiers = [
  {
    name: 'Starter',
    href: '/signup',
    priceMonthly: 0,
    description: 'Perfekt, um erste Erfahrungen mit MindFrame zu sammeln.',
    features: [
      'Brain Organizer: 5 Sammlungen',
      'Decision Wizard: 3 Entscheidungen',
      'Focus Mapper: 1 aktives Ziel',
      'Basis-Reflexionslogbuch',
      'E-Mail-Support',
    ],
  },
  {
    name: 'Pro',
    href: '/signup',
    priceMonthly: 9,
    description: 'Ideal für Selbstständige und produktive Einzelpersonen.',
    features: [
      'Brain Organizer: Unbegrenzt',
      'Decision Wizard: Unbegrenzt',
      'Focus Mapper: 5 aktive Ziele',
      'Erweitertes Reflexionslogbuch',
      'Vorrang-Support',
      'Erweiterte Analyse-Tools',
    ],
  },
  {
    name: 'Team',
    href: '/signup',
    priceMonthly: 29,
    description: 'Für Teams, die gemeinsam klarer denken und entscheiden wollen.',
    features: [
      'Alles aus Pro',
      'Bis zu 5 Teammitglieder',
      'Kollaborative Entscheidungsfindung',
      'Team-Fokusziele und -aufgaben',
      'Admin-Dashboard',
      'Premium-Support',
    ],
  },
];

const PricingSection = () => {
  return (
    <div id="pricing" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Preise</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Das richtige Paket für deine Bedürfnisse
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Starte kostenlos und wachse mit deinen Anforderungen.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">{tier.priceMonthly === 0 ? 'Kostenlos' : `${tier.priceMonthly}€`}</span>
                  {tier.priceMonthly > 0 && <span className="ml-1 text-xl font-semibold text-gray-500">/Monat</span>}
                </div>
                
                <p className="mt-2 text-gray-500">{tier.description}</p>
                
                <ul className="mt-6 space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={tier.href}
                  className="mt-8 block w-full bg-blue-600 text-white text-center rounded-md py-2 font-medium hover:bg-blue-700"
                >
                  {tier.priceMonthly === 0 ? 'Kostenlos starten' : 'Jetzt upgraden'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;