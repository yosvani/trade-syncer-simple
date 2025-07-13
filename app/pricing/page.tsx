// app/pricing/page.tsx
// Página para Pricing. Estilo moderno con pricing tiers cards.

'use client';  // Agregado para client-side rendering

import React from 'react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 md:p-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-bold text-indigo-700">Pricing</h1>
        <p className="text-xl text-gray-600 mt-4">Planes flexibles para todos los niveles de traders. Prueba gratuita de 7 días.</p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Básico</h2>
          <p className="text-4xl font-bold text-gray-800 mb-4">$0/mes</p>
          <ul className="space-y-2 text-gray-600">
            <li>Sync básico de trades</li>
            <li>Dashboard simple</li>
            <li>1 broker</li>
          </ul>
          <a href="/auth/signup" className="block mt-6 bg-indigo-600 text-white py-2 rounded-full text-center hover:bg-indigo-700 transition duration-300">Empezar Gratis</a>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-indigo-600">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Pro</h2>
          <p className="text-4xl font-bold text-gray-800 mb-4">$29/mes</p>
          <ul className="space-y-2 text-gray-600">
            <li>Sync ilimitado</li>
            <li>Analytics avanzados</li>
            <li>Múltiples brokers</li>
            <li>Soporte 24/7</li>
          </ul>
          <a href="/auth/signup" className="block mt-6 bg-indigo-600 text-white py-2 rounded-full text-center hover:bg-indigo-700 transition duration-300">Elegir Pro</a>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Enterprise</h2>
          <p className="text-4xl font-bold text-gray-800 mb-4">Contactar</p>
          <ul className="space-y-2 text-gray-600">
            <li>Custom integrations</li>
            <li>Equipo dedicado</li>
            <li>API access</li>
          </ul>
          <a href="/contact" className="block mt-6 bg-indigo-600 text-white py-2 rounded-full text-center hover:bg-indigo-700 transition duration-300">Contactar Ventas</a>
        </div>
      </section>
    </div>
  );
}