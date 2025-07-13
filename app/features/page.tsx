// app/features/page.tsx
// Página para Features. Estilo moderno con sections y cards.

'use client';  // Agregado para client-side rendering

import React from 'react';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 md:p-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-bold text-indigo-700">Features</h1>
        <p className="text-xl text-gray-600 mt-4">Descubre las poderosas funcionalidades de TradeSyncer.</p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Sincronización en Tiempo Real</h2>
          <p className="text-gray-600">Copia trades automáticamente con precisión de milisegundos entre múltiples brokers.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Dashboard Avanzado</h2>
          <p className="text-gray-600">Visualiza analytics, ganancias/pérdidas y métricas de desempeño en un solo lugar.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Calendario Económico</h2>
          <p className="text-gray-600">Accede a noticias, eventos y restricciones de mercado en vivo para decisiones informadas.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Soporte Multi-Broker</h2>
          <p className="text-gray-600">Integra con NinjaTrader, TradingView, Tradovate y más para trading cruzado.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Seguridad y Soporte 24/7</h2>
          <p className="text-gray-600">Conexiones seguras y soporte experto para configuración y troubleshooting.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Prueba Gratuita</h2>
          <p className="text-gray-600">7 días de acceso completo con cancelación en cualquier momento.</p>
        </div>
      </section>
    </div>
  );
}