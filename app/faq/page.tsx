// app/faq/page.tsx
// Página para FAQ. Estilo moderno con accordion simulado.

'use client';  // Agregado para client-side rendering

import React from 'react';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 md:p-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-bold text-indigo-700">FAQ</h1>
        <p className="text-xl text-gray-600 mt-4">Preguntas frecuentes sobre TradeSyncer.</p>
      </header>
      
      <section className="max-w-4xl space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">¿Cómo funciona la sincronización?</h2>
          <p className="text-gray-600">Conecta tus brokers y la plataforma copia trades en real-time con precisión de milisegundos.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">¿Es segura?</h2>
          <p className="text-gray-600">Sí, usamos conexiones encriptadas y plataformas reguladas. No almacenamos fondos.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">¿Qué brokers soporta?</h2>
          <p className="text-gray-600">NinjaTrader, TradingView, Tradovate, Rithmic y más en desarrollo.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">¿Cómo cancelo la prueba?</h2>
          <p className="text-gray-600">En cualquier momento desde tu cuenta, sin cargos.</p>
        </div>
      </section>
    </div>
  );
}