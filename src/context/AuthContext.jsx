// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger état initial depuis localStorage
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('chat_user');
      const storedAuth = localStorage.getItem('isAuthenticated') === 'true';

      if (rawUser) {
        setUser(JSON.parse(rawUser));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(storedAuth);
      }
    } catch (e) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // login simulé (passer l'UUID qui existe dans users table)
  const loginSimulated = (opts = {}) => {
    const u = {
      id: opts.id || '11111111-1111-1111-1111-111111111111',
      email: opts.email || 'test@example.com',
      name: opts.name || 'Visiteur Test',
      role: opts.role || 'member',
    };
    localStorage.setItem('chat_user', JSON.stringify(u));
    localStorage.setItem('isAuthenticated', 'true');
    setUser(u);
    setIsAuthenticated(true);
  };

  // login classique (juste auth sans user)
  const login = (email = null) => {
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('chat_user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginSimulated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
