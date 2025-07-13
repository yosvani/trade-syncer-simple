// app/about-us/page.tsx
// Página para About Us. Estilo moderno con bio y team sections.

'use client';  // Agregado para client-side rendering

import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 md:p-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-bold text-indigo-700">About Us</h1>
        <p className="text-xl text-gray-600 mt-4">Conoce al equipo detrás de TradeSyncer, tu socio en trading eficiente.</p>
      </header>
      
      <section className="max-w-4xl text-gray-700 mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Nuestra Misión</h2>
        <p className="mb-4">En TradeSyncer, nos dedicamos a simplificar el trading cruzado, permitiendo a traders replicar operaciones en tiempo real sin complicaciones. Nuestra plataforma en la nube soporta múltiples brokers y plataformas, enfocándonos en precisión, seguridad y accesibilidad.</p>
        <p>Fundados en 2023, hemos ayudado a miles de usuarios a optimizar sus estrategias con tools como analytics unificados y calendarios económicos en vivo.</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Equipo Ejecutivo</h3>
          <p>Dirigido por expertos en fintech con experiencia en NinjaTrader y TradingView.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Visión Futura</h3>
          <p>Expandiendo a IA para predicciones y más integraciones de brokers.</p>
        </div>
      </section>
    </div>
  );
}