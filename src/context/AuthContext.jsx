// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // <-- user null par défaut
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // <-- nouvel état pour Vercel

  // Charger état initial depuis localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return; // éviter SSR

    try {
      const rawUser = localStorage.getItem('chat_user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // fin du chargement
    }
  }, []);

  // login avec user complet
  const login = (opts = {}) => {
    const u = {
      id: opts.id || '11111111-1111-1111-1111-111111111111',
      email: opts.email || 'test@example.com',
      name: opts.name || 'Visiteur Test',
      role: opts.role || 'member',
      avatar_url:
        opts.avatar_url ||
        `https://api.dicebear.com/9.x/identicon/svg?seed=${opts.name || 'Visiteur'}`, // avatar par défaut
    };
    localStorage.setItem('chat_user', JSON.stringify(u));
    setUser(u);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('chat_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {!loading && children}{' '}
      {/* on n'affiche l'app que quand le chargement est fini */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
