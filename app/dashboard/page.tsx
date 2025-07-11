// app/dashboard/page.tsx
// Página de dashboard modular. Protegida por auth; muestra trades en lista y gráfico.
// Real-time: Actualiza auto via hook. Usa Chart.js para analytics básicos.

'use client'; // Client-side para interacciones y gráficos

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useTrades } from '../../hooks/useTrades';
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

// Registra elementos de Chart.js (requerido una vez)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { user, loading: authLoading, logout } = useAuth();  // Fusionado: user, authLoading y logout en una sola declaración
  const { trades, loading, error, addTrade } = useTrades();
  const router = useRouter();

  // Protección: Solo redirige si no loading y no user
  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  if (authLoading || loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  // Datos para gráfico simple (ej. amounts por tiempo)
  const chartData = {
    labels: trades.map((t) => new Date(t.created_at).toLocaleTimeString()), // Eje X: Tiempos
    datasets: [
      {
        label: 'Trade Amounts',
        data: trades.map((t) => t.amount), // Eje Y: Cantidades
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Sección de Trades */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl mb-4">Tus Trades</h2>
        {trades.length === 0 ? (
          <p>No hay trades aún. Agrega uno de prueba.</p>
        ) : (
          <ul className="space-y-2">
            {trades.map((trade) => (
              <li key={trade.id} className="border p-2 rounded">
                <span className="font-semibold">{trade.instrument}</span> - {trade.amount} ({trade.type}) at {new Date(trade.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        {/* Botón para agregar trade de prueba (simula sincronización) */}
        <button
          onClick={() => addTrade('BTC/USD', Math.random() * 100 + 50, 'buy')} // Random amount para test
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Agregar Trade de Prueba
        </button>
      </section>

      {/* Sección de Analytics con Gráfico */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl mb-4">Analytics</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </section>
    </div>
  );
}