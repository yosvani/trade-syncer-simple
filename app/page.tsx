import { supabase } from '../lib/supabase-db';

export default async function Home() {
  const { data, error } = await supabase.from('test_table').select('*'); // Tabla dummy
  console.log('Supabase test:', data, error);

  return (
    <div>
      <h1>Prueba Supabase</h1>
      <p>Revisa la consola del server (terminal) para logs.</p>
    </div>
  );
}