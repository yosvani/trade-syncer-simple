// app/dashboard/page.tsx
// Página de dashboard mejorada con mayor espaciado, layout pulido, categorías con íconos, subcategorías ocultas/toggle, diseño moderno.

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useTrades } from '../../hooks/useTrades';
import { useBrokerConfigs } from '../../hooks/useBrokerConfigs';
import EconomicCalendar from '../../components/EconomicCalendar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaHome, FaLink, FaCopy, FaBook, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'; // Íconos modernos

// Registra elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { user, loading: authLoading, logout, trialExpired } = useAuth();
  const { trades, loading, error, addTrade } = useTrades();
  const { configs, addConfig } = useBrokerConfigs();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('created_at');
  const [open, setOpen] = useState(false); // Toggle navbar mobile
  const [openSections, setOpenSections] = useState({ copyTrading: false, journaling: false }); // Toggle subcategorías

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
    document.body.classList.toggle('dark', darkMode);
  }, [user, authLoading, router, darkMode]);

  if (authLoading || loading) return <p className="text-center text-lg animate-pulse">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (trialExpired) return <p className="text-red-500 text-center">Trial expired. Subscribe to continue!</p>;

  const chartData = {
    labels: trades.map((t) => new Date(t.created_at).toLocaleTimeString()),
    datasets: [
      {
        label: 'Trade Amounts',
        data: trades.map((t) => t.amount),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Trade Performance' } },
    scales: { y: { beginAtZero: true } },
  };

  const totalTrades = trades.length;
  const totalAmount = trades.reduce((sum, t) => sum + t.amount, 0);
  const avgAmount = totalTrades ? (totalAmount / totalTrades).toFixed(2) : 0;

  const sortedTrades = [...trades].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Navbar Vertical Fijo: Exclusivo para dashboard, altura completa, secciones con toggle */}
      <nav className={`fixed top-0 left-0 h-screen w-72 ${darkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-gray-100 border-r border-gray-300'} shadow-lg z-50 flex flex-col p-6 transition-all duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="text-2xl font-extrabold mb-6">
          <span className={darkMode ? 'text-white' : 'text-gray-800'}>Tradesyncer</span>
        </div>
        <ul className="flex-1 space-y-2">
          <li><a href="#" onClick={() => setOpenSections({ ...openSections, home: !openSections.home })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaHome className="mr-3" />Home</a></li>
          <li><a href="#" onClick={() => setOpenSections({ ...openSections, connections: !openSections.connections })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaLink className="mr-3" />Connections</a></li>
          <li>
            <a href="#" onClick={() => setOpenSections({ ...openSections, copyTrading: !openSections.copyTrading })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaCopy className="mr-3" />Copy Trading</a>
            {openSections.copyTrading && (
              <ul className="space-y-1 mt-1">
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Cockpit</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" onClick={() => setOpenSections({ ...openSections, journaling: !openSections.journaling })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaBook className="mr-3" />Journaling</a>
            {openSections.journaling && (
              <ul className="space-y-1 mt-1">
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Dashboard</a></li>
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Daily</a></li>
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Weekly</a></li>
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Strategy</a></li>
                <li><a href="#" className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 ml-6 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 ml-6 rounded-lg'}>Manage Data</a></li>
              </ul>
            )}
          </li>
          <li><a href="#" onClick={() => setOpenSections({ ...openSections, calendar: !openSections.calendar })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaCalendarAlt className="mr-3" />Calendar</a></li>
          <li><a href="#" onClick={() => setOpenSections({ ...openSections, propfirmDeals: !openSections.propfirmDeals })} className={darkMode ? 'flex items-center text-gray-200 hover:bg-gray-800 hover:text-white p-2 rounded-lg' : 'flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-lg'}><FaBriefcase className="mr-3" />Propfirm Deals</a></li>
        </ul>
        <div className="mt-4">
          <button onClick={logout} className={darkMode ? 'w-full text-left text-gray-200 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition duration-300' : 'w-full text-left text-gray-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition duration-300'}>Logout</button>
        </div>
        {/* Hamburger Icon para Mobile */}
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setOpen(!open)} className="text-white dark:text-gray-200 focus:outline-none">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Contenido con mayor espaciado y layout pulido */}
      <div className={`flex-1 pl-0 md:pl-80 p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Stats Summary Cards con mayor espaciado */}
        <section className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up">
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">Total Trades</h2>
            <p className="text-3xl">{totalTrades}</p>
          </div>
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">Total Amount</h2>
            <p className="text-3xl">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">Avg Amount</h2>
            <p className="text-3xl">${avgAmount}</p>
          </div>
        </section>

        {/* Sección de Trades con Table Sortable */}
        <section className="mx-auto max-w-7xl mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Tus Trades</h2>
          <div className="flex space-x-4 mb-4">
            <button onClick={() => setSortBy('created_at')} className="px-4 py-2 rounded bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800">Sort by Date</button>
            <button onClick={() => setSortBy('amount')} className="px-4 py-2 rounded bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800">Sort by Amount</button>
            <button onClick={() => addTrade('BTC/USD', Math.random() * 100 + 50, 'buy')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Agregar Trade de Prueba
            </button>
          </div>
          {sortedTrades.length === 0 ? (
            <p>No hay trades aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-2 text-left">Instrument</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTrades.map((trade) => (
                    <tr key={trade.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <td className="p-2">{trade.instrument}</td>
                      <td className="p-2">{trade.amount}</td>
                      <td className="p-2 capitalize">{trade.type}</td>
                      <td className="p-2">{new Date(trade.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Sección de Analytics */}
        <section className="mx-auto max-w-7xl mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <Line data={chartData} options={chartOptions} />
        </section>

        {/* Sección de Calendario Económico */}
        <section className="mx-auto max-w-7xl mb-12">
          <EconomicCalendar />
        </section>

        {/* Sección de Simulación de Brokers */}
        <section className="mx-auto max-w-7xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Conectar Brokers (Simulación)</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            addConfig(form.broker.value, form.apikey.value, { instrument: form.instrument.value });
          }} className="space-y-4">
            <input name="broker" placeholder="Broker Name (ej. TradingView)" className="block w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" required />
            <input name="apikey" placeholder="API Key (mock)" className="block w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" required />
            <input name="instrument" placeholder="Instrument (ej. BTC/USD)" className="block w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              Conectar
            </button>
          </form>
          <ul className="mt-6 space-y-2">
            {configs.map((conf) => (
              <li key={conf.id} className="border p-3 rounded-lg dark:border-gray-600">
                {conf.broker_name} - {conf.api_key} ({conf.config.instrument})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}