// app/affiliates/page.tsx
// Página para Affiliates. Estilo moderno con call-to-action.

'use client';  // Agregado para client-side rendering

import React from 'react';

export default function Affiliates() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 md:p-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-bold text-indigo-700">Programa de Affiliates</h1>
        <p className="text-xl text-gray-600 mt-4">Gana comisiones recomendando TradeSyncer a tus seguidores.</p>
      </header>
      
      <section className="max-w-4xl text-gray-700 mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Beneficios</h2>
        <ul className="space-y-4">
          <li>Comisiones del 30% por referral.</li>
          <li>Enlaces personalizados y tracking.</li>
          <li>Pagos mensuales vía PayPal o transferencia.</li>
          <li>Recursos de marketing gratuitos.</li>
        </ul>
      </section>
      
      <a href="/auth/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition duration-300 shadow-md">
        Unirte al Programa
      </a>
    </div>
  );
}