// components/EconomicCalendar.tsx
// Componente modular para calendario económico. Usa Finnhub API (free tier), muestra en FullCalendar.

'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

interface EconomicEvent {
  country: string;
  event: string;
  date: string;
  impact: string;
  previous: string;
  forecast: string;
}

const EconomicCalendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      const from = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]; // Última semana
      const to = new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0]; // Próximas 2 semanas
      const apiKey = 'd1omrgpr01quemda0nf0d1omrgpr01quemda0nfg';  // Reemplaza con tu key de Finnhub
      const url = `https://finnhub.io/api/v1/calendar/economic?from=${from}&to=${to}&token=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.economicCalendar || !Array.isArray(data.economicCalendar)) {
          throw new Error('Invalid data format from API (no economicCalendar array)');
        }
        const calendarEvents = data.economicCalendar.map((ev: EconomicEvent) => ({
          title: `${ev.country} - ${ev.event} (${ev.impact})`,
          start: ev.date,
          description: `Prev: ${ev.previous} | Forecast: ${ev.forecast}`,
        }));
        setEvents(calendarEvents);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Unknown error fetching calendar';
        console.error('Error fetching calendar:', err);
        setFetchError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Cargando calendario...</p>;
  if (fetchError) return <p className="text-red-500">Error: {fetchError}. Verifica tu API key de Finnhub.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-4">Calendario Económico</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <p>{eventInfo.event.extendedProps.description}</p>
          </div>
        )}
      />
    </div>
  );
};

export default EconomicCalendar;