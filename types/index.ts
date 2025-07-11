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