// types/index.ts
// Tipos reutilizables para mantener consistencia y evitar errores en cambios.

export interface User {
  id: string;
  email: string;
  // Agrega más campos si necesitas (ej. name: string)
}

export interface AuthError {
  message: string;
}


// Extensión de tipos para trades. Mantiene consistencia en DB queries.
export interface Trade {
  id: string;
  created_at: string;
  user_id: string;
  instrument: string;
  amount: number;
  type: 'buy' | 'sell';
}