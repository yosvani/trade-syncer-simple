// components/Landing.tsx
// Este componente maneja la página de inicio (landing). Moderno con gradients, animaciones y responsive.
// Navbar mejorado: Sticky, responsive con useState para toggle en mobile, animaciones hover y slide-in.

'use client';  // Agregado: Para permitir hooks como useState en client-side

import React, { useState } from 'react';

const Landing: React.FC = () => {
  const [open, setOpen] = useState(false);  // Estado para toggle menu mobile

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-0">
      {/* Navbar Mejorado: Sticky, responsive con estado React para toggle, animaciones */}
      <nav className="sticky top-0 bg-white shadow-md py-4 px-6 md:px-12 z-10 flex justify-between items-center rounded-b-xl animate-fade-in-down">
        <div className="text-2xl font-bold text-indigo-700">TradeSyncer</div>
        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer hover:scale-105">Features</li>
          <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer hover:scale-105">About Us</li>
          <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer hover:scale-105">Pricing</li>
          <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer hover:scale-105">Affiliates</li>
          <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer hover:scale-105">FAQ</li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <a href="/auth/login" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300">
            Sign in
          </a>
          <a href="/auth/signup" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
            Start For Free
          </a>
        </div>
        {/* Hamburger Icon para Mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Menu Mobile: Slide-in con animación Tailwind */}
        <div className={`${open ? 'translate-x-0' : 'translate-x-full'} absolute top-full left-0 w-full bg-white shadow-md md:hidden transition-transform duration-300 ease-in-out`}>
          <ul className="flex flex-col space-y-4 p-6 text-gray-700">
            <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer">Features</li>
            <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer">Pricing</li>
            <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer">Affiliates</li>
            <li className="hover:text-indigo-600 transition-colors duration-300 cursor-pointer">FAQ</li>
            <li><a href="/auth/login" className="block bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300 text-center">Sign in</a></li>
            <li><a href="/auth/signup" className="block bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md text-center">Start For Free</a></li>
          </ul>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 md:py-0">
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 drop-shadow-md">
            TradeSyncer Clone
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl">
            Sincroniza tus trades en tiempo real entre brokers. Precisión de milisegundos, analytics avanzados y prueba gratuita de 7 días.
          </p>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
          {/* Features - Cards modernas con hover */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold text-indigo-600">Sincronización Rápida</h2>
            <p className="text-gray-600 mt-2">Copia trades en milisegundos entre cuentas.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-indigo-600">Dashboard Unificado</h2>
            <p className="text-gray-600 mt-2">Analytics en tiempo real y métricas.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="text-3xl mb-4">🗓️</div>
            <h2 className="text-2xl font-semibold text-indigo-600">Calendario Económico</h2>
            <p className="text-gray-600 mt-2">Noticias y eventos en vivo.</p>
          </div>
        </section>
        
        <section className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-md italic text-gray-600">
              "¡Increíble herramienta para traders profesionales!" - Trader Pro
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md italic text-gray-600">
              "Sincronización perfecta, ahorró horas de trabajo." - Usuario Satisfecho
            </div>
          </div>
        </section>
        
        <footer className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 animate-fade-in-up">
          <a href="/auth/signup" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition duration-300 shadow-md">
            Regístrate Gratis
          </a>
          <a href="/auth/login" className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition duration-300 shadow-md">
            Login
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Landing;