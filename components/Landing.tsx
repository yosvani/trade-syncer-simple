// components/Landing.tsx
// Este componente maneja la página de inicio (landing). Es reusable y no depende de auth o DB aún.

import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">TradeSyncer Clone</h1>
        <p className="text-lg text-gray-700 mt-2">
          Sincroniza tus trades en tiempo real entre brokers. Prueba gratuita de 7 días.
        </p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Features - Cada feature es un card simple */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Sincronización Rápida</h2>
          <p>Copia trades en milisegundos entre cuentas.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Dashboard Unificado</h2>
          <p>Analytics en tiempo real y métricas.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Calendario Económico</h2>
          <p>Noticias y eventos en vivo.</p>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Testimonios</h2>
        <p className="italic">"¡Increíble herramienta para traders!" - Usuario Ejemplo</p>
        {/* Agrega más si quieres */}
      </section>
      
     <footer className="mt-8 flex space-x-4">
      <a href="/auth/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Regístrate Gratis</a>
       <a href="/auth/login" className="bg-green-500 text-white px-4 py-2 rounded">Login</a>
     </footer>
    </div>
  );
};

export default Landing;