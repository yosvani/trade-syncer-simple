// components/Navbar.tsx
// Navbar vertical, full-height, fixed, responsive (colapsable en mobile), estilo moderno como Grok/X sidebar.
// Logo arriba, menu con dropdown para Journaling, icons para atractivo.

'use client';

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(true);  // Para toggle en mobile/small screens
  const [dropdownOpen, setDropdownOpen] = useState(false);  // Para submenu Journaling

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto transition-width duration-300 z-10 md:w-64 ${open ? 'w-64' : 'w-16'}">
      {/* Toggle Button para Mobile */}
      <div className="flex justify-end p-4 md:hidden">
        <button onClick={() => setOpen(!open)} className="text-gray-700 dark:text-gray-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="p-4 text-center">
        <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Tradesyncer</div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 p-4 text-gray-700 dark:text-gray-300">
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Home</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Connections</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Copy Trading</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Cockpit</span>
        </li>
        {/* Dropdown para Journaling */}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}  // Click para mobile, hover para desktop
            className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer w-full"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className={`${open ? 'block' : 'hidden'}`}>Journaling</span>
          </button>
          {dropdownOpen && open && (
            <ul className="pl-6 space-y-2 mt-2">
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Dashboard</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Daily</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Weekly</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Strategy</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Manage Data</li>
            </ul>
          )}
        </li>
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-2 8h.01M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Calendar</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 4c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 4c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" /></svg>
          <span className={`${open ? 'block' : 'hidden'}`}>Propfirm Deals</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;