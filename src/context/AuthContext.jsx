// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user connecté
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // état pour attendre le localStorage

  // Charger l'état initial depuis localStorage (évite problème SSR)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawUser = localStorage.getItem('chat_user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Erreur lecture localStorage:', e);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // login avec user complet
  const login = ({ id, email, name, role, avatar_url } = {}) => {
    const u = {
      id: id || crypto.randomUUID(),
      email: email || 'test@example.com',
      name: name || 'Visiteur Test',
      role: role || 'member',
      avatar_url:
        avatar_url ||
        `https://api.dicebear.com/9.x/identicon/svg?seed=${name || 'Visiteur'}`,
    };

    localStorage.setItem('chat_user', JSON.stringify(u));
    setUser(u);
    setIsAuthenticated(true);
  };

  // logout simple
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
      {/* n'affiche l'app que quand le chargement est fini */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
